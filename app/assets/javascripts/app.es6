let ABSOLUTE_START;
const HOUR_IN_PX = 36,
  DAY_GAP = 18*4,
  PERSPECTIVE = '60px',
  NORMAL_Z = 5,
  MIN_Z = 15,
  OUT_Z = 25,
  MIN_Z_DELTA = 5;

const smallScreen = () => (window.innerWidth <= 767);

class Program{
  constructor({ elem, dateStart, dateEnd, section, venue }){
    this.elem = elem;
    this.type = elem.hasClass('artist') ? 'artist' : 'event';
    this.postID = elem.data(this.type+'-id');
    this.venue = venue;
    this.letter = elem.data('letter');
    this.dateStart = new Date(dateStart);
    const date = `${this.dateStart.getDate()}-${this.dateStart.getMonth()+1}`
    this.elem.attr('data-date', date);
    this.date = date;
    this.dateEnd = new Date(dateEnd);
    this.section = section;
    this.duration = this.dateEnd - this.dateStart;
    this.durationInHour = this.duration/(1000*60*60)
    this.hoursFromStart = (this.dateStart - ABSOLUTE_START)/(1000*60*60);

    this.conflictCount = 0;
    this.posX = 0;
    this.posY = 0;
    this.posZ = 0;
    this.active = true;
    this.isOut = false;
    this.elem.get(0).program = this;
    this.elem.data('program', this);
    this._bindHover();
    if(smallScreen()){
      const backgroundImage = this.elem.data('image');
      this.elem.css({ backgroundImage: `url(${backgroundImage})` });
    }
  }
  _bindHover(){
    const thumbnail = $(`.thumbnails [data-${this.type}-id="${this.postID}"]`);
    this.elem.hover(
      (ev) => {
        $('body').addClass('program-hovered');
        if(thumbnail.hasClass('out')){
          thumbnail.removeClass('out');
          thumbnail.addClass('reset');
          document.body.offsetHeight;
          thumbnail.removeClass('reset');
        }
        thumbnail.addClass('in');
      },
      (ev) => {
        $('body').removeClass('program-hovered');
        thumbnail.addClass('out').removeClass('in');
      }
    )
  }
  testAndActivate({ type, key, value }){
    this.isOut = (this.type != type);
    this.active = ((value == 'reset') || (this[key] == value));
    this.setTransform();
  }
  // position
  position(posY){
    this.posY = posY;
    if(!(this.conflictCount > 0)){
      const maxTransform = $('main').width()*.7 - this.elem.outerWidth();
      this.posX = (Math.floor(Math.random() * maxTransform)) + 'px';
    }
    const position = smallScreen() ? '' : 'absolute'
    this.elem.css({ position });
    this.setTransform();
    this.elem.addClass('ready');
  }
  addConflict(conflictCount, posInConflict){
    this.conflictCount = conflictCount;
    this.elem.attr("data-conflict-count", this.conflictCount);
    this.elem.attr("data-conflict-position", posInConflict);
    this.posX = posInConflict*100 + '%';
    this.setTransform();
  }
  setTransform(){
    let posZ;
    if(this.isOut){
      posZ = rdmZOut();
      this.elem.removeClass('inactive active in').addClass('out');
    }
    else if(this.active){
      posZ = rdmZFront();
      this.elem.removeClass('out inactive').addClass('active');
    }
    else{
      posZ = rdmZBack();
      this.elem.removeClass('out active').addClass('inactive');
    }

    let transform
    if(!smallScreen()){
      transform = `translate3D(${this.posX}, ${this.posY}px, ${posZ}px)`;
    }
    else{
      transform = `translate3D(0%, 0px, 0px)`;
    }

    this.elem.css({ transform });
  }
  endPos(){
    let endPos;
    if(this.active){
      endPos = this.elem.outerHeight() + this.posY;
    }
    else{
      endPos = .3*this.elem.outerHeight() + this.posY;
    }
    return endPos;
  }
};


function rdmZBack(){
  return -(Math.floor(Math.random() * MIN_Z_DELTA) + MIN_Z);
};
function rdmZFront(){
  return -(Math.floor(Math.random() * NORMAL_Z));
};
function rdmZOut(){
  return -(Math.floor(Math.random())*MIN_Z_DELTA/2 + OUT_Z);
};
class Programs{
  constructor(posts){
    this.programs = [];
    this.artists = [];
    this.container = $('#program');
    ABSOLUTE_START = new Date(this.container.data('date-start'));
    const perspective = smallScreen() ? 'auto' : PERSPECTIVE;
    console.log(perspective);
    $('main').css({
      perspective,
      perspectiveOrigin: `50% ${50}vh`,
    });
    for (var i = 0; i < posts.length; i++) {
      const elem = $(posts[i]);
      if(elem.hasClass('event')){
        const dateStart = elem.data('date-start'),
          dateEnd = elem.data('date-end'),
          section = elem.data('section'),
          venue = elem.data('venue');
        this.programs.push(new Program({ elem, dateStart, dateEnd, section, venue }));
      }
      else{
        this.artists.push(new Program({ elem }))
        elem.addClass('ready')
      }
    }
  }
  filterBy(keyValue){
    this.activeFilter = keyValue;
    $('body').attr('data-current-type', keyValue.type)
    this.programs.forEach( prog => prog.testAndActivate(keyValue) );
    this.artists.forEach( art =>  art.testAndActivate(keyValue) );
    this.positionAllByTime();
    this.positionArtistLegend();
  }
  positionAll(){
    this.positionArtistLegend();
    this.positionAllByTime();
  }
  positionArtistLegend(){
    $('.legend .letter').each(function(e, obj){
      const letter = $(obj).data('letter');
      const firstArtist = $(`.post[data-letter="${letter}"]`).first();
      let transform = firstArtist.position().top;
      transform = `translateY(${transform}px)`;
      $(obj).css({ transform })
    });
  }
  positionDatesLegend(){
    $('.legend .day[data-date]').each((i, elem) => {
      const $this = $(elem);
      const date = $this.data('date');
      const firstPost = $('.post.active[data-date="'+date+'"]');
      if(!firstPost.length){
        $this.hide();
      }
      else{
        const top = firstPost.data('program').posY;
        $this.show().css({ top });
      }

    })
  }
  positionAllByTime(){
    let minY = 0,
      gap = 0,
      conflictCount = 0;

    const rotate = smallScreen() ? ' rotateZ(-90deg)' : '';
    this.programs.forEach((prog, i) => {
      let basePosY = prog.hoursFromStart*HOUR_IN_PX;
      let oldGap = gap;
      if(minY < basePosY){
        gap = Math.max(0, oldGap, basePosY - minY);
        basePosY = Math.min(minY, basePosY - oldGap);
      }


      if(basePosY < minY){
        conflictCount++;
        for (var j = 0; j <= conflictCount; j++)
        {
          this.programs[i-j].addConflict(conflictCount+1, conflictCount - j);
        }
      }
      else{
        conflictCount = 0;
      }

      prog.position(basePosY);
      minY = Math.max(prog.endPos(), minY);
    });
    this.positionDatesLegend();

  }
};
(() => {

  let programs;
  $(document).on('turbolinks:load ready', () => {
    const isProgramPage = $('#program').length != 0;
    window.programs = programs;
    const programsContainer = $('.post.event'),
      artistsContainer = $('.post.artist');
    if(isProgramPage)
    {
      const $prog = $('#program .post');
      programs = new Programs($prog);
      programs.positionAll();
      programs.filterBy({ type: 'event', value: 'reset'})
      initFilters();

      function initFilters(){
        const filters = $('.filters [data-type]');
        $('.filters [data-type]').click((e) => {
          const clicked = $(e.currentTarget),
           value = clicked.data('value'),
           key = clicked.data('key'),
           type = clicked.data('type');
           if((key && value) || key == 'reset'){
             programs.filterBy({ type, key, value });
           }
        });

        $('.filter-title').click( e => {
          const $this = $(e.currentTarget);
          const key = $this.data('key');
          $('.filter-title').removeClass('active');
          $this.addClass('active');
          $(`.filter-list:not(.${key})`).addClass('collapsed');
          $(`.filter-list.${key}`).removeClass('collapsed');
        });
      }
    }

    $('nav').on('scroll', e => e.preventDefault() )
    $(window).on('resize', debounce(programs.positionAll.bind(programs), 800));
  });


  function reset(_$){
    _$.addClass('reset').removeClass('out in');
    document.body.offsetHeight;
    _$.removeClass('reset');
  }
})();
