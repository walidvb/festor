let ABSOLUTE_START,
  SCROLLING = false;
const HOUR_IN_PX = 18*2,
  DAY_GAP = 18*10,
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
    this.id = elem.data(this.type+'-id');
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
    this.elem.css({'transition-duration': '0s'});
    this.elem.data('program', this);

    this.isSentOut = false;
    this.isEntering = true;
    this._bindHover();
    if(smallScreen()){
      const backgroundImage = this.elem.data('image');
      this.elem.css({ backgroundImage: `url(${backgroundImage})` });
    }
  }
  _bindHover(){
    const thumbnailSelector = `.thumbnails [data-${this.type}-id="${this.id}"]`;
    const showImg = () => {
      if(!SCROLLING){
        const thumbnail = $(thumbnailSelector);
        $('body').addClass('program-hovered');
        if(thumbnail.hasClass('out')){
          thumbnail.removeClass('out');
          thumbnail.addClass('reset');
          document.body.offsetHeight;
          thumbnail.removeClass('reset');
        }
        thumbnail.addClass('in');
      }
    }
    this.elem.on('mousemove', showImg);
    this.elem.hover( showImg ,
      (ev) => {
        if(!SCROLLING){
          const thumbnail = $(thumbnailSelector);
          $('body').removeClass('program-hovered');
          thumbnail.addClass('out').removeClass('in');
        }
      }
    )
  }
  testAndActivate({ type, key, value }){
    this.isOut = (this.type != type);
    this.active = ((value == 'reset') || value.includes(this[key]));
    this.setTransform();
  }
  // position
  position(posY){
    this.posY = posY;
    if(!(this.conflictCount > 0)){
      const maxTransform = $('main').width()*.7 - this.elem.outerWidth();
      this.posX = 0;
      // position horizontally randomly
      // this.posX = (Math.floor(Math.random() * maxTransform)) + 'px';
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
    let posZ, opacity = 1;
    if(this.isEntering){
      posZ    = -Math.floor(Math.random()*5 + OUT_Z*2);
      opacity = .5;
    }
    else if(this.isSentOut){
      posZ    = Math.floor(Math.random()*5 + OUT_Z);
      opacity = 0;
    }
    else if(this.isOut){
      posZ = rdmZOut();
      this.elem.removeClass('inactive active in').addClass('out');
      opacity = .5;
    }
    else if(this.active){
      posZ = 0;// rdmZFront();
      this.elem.removeClass('out inactive').addClass('active');
    }
    else{
      posZ = rdmZBack();
      opacity = .7;
      this.elem.removeClass('out active').addClass('inactive');
    }

    let transform
    if(!smallScreen()){
      transform = `translate3D(${this.posX}, ${this.posY}px, ${posZ}px)`;
    }
    else{
      transform = `translate3D(0%, 0px, 0px)`;
    }
    this.elem.css({ transform, opacity });
  }
  sendIn(){
    this.isEntering = false;
    this.elem.css({ transitionDuration: '', opacity: 1, "pointer-events": '' })
    this.setTransform();
  }
  sendOut(){
    this.isSentOut = true;
    this.elem.css({ transitionDuration: '1.5s', opacity: 0, "pointer-events": 'none' })
    this.setTransform();
    this.isEntering = true;
    this.isSentOut = false;
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
    $('body').attr('data-current-type', keyValue.type);
    this.programs.forEach( prog => prog.testAndActivate(keyValue) );
    this.artists.forEach( art =>  art.testAndActivate(keyValue) );
    this.positionAll();
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
        const transform = firstPost.data('program').posY;
        $this.show().css({ transform: `translateY(${transform}px)` });
      }
    })
  }
  sendAllIn(){
    this.programs.forEach( prog => prog.sendIn() );
    this.artists.forEach( art =>  art.sendIn() );
    $('.legend .day, .legend .letter').addClass('ready');
  }
  sendAllOut(){
    this.container.addClass('exit');
    $('.legend').addClass('exit');
    this.programs.forEach( prog => prog.sendOut() );
    this.artists.forEach( art =>  art.sendOut() );
  }
  positionAllByTime(){
    let minY = 0,
      gap = 0,
      conflictCount = 0,
      currDay;

    const rotate = smallScreen() ? ' rotateZ(-90deg)' : '';
    this.programs.forEach((prog, i) => {
      let basePosY = prog.hoursFromStart*HOUR_IN_PX;
      let oldGap = gap;
      currDay = currDay || prog.date;
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
      if(prog.date != currDay){
        minY += DAY_GAP;
        currDay = prog.date;
      }
    });
    this.positionDatesLegend();

  }
};
(() => {

  let programs;
  let activeFilters = { type: 'event', value: 'reset' };
  $(document).on('turbolinks:load', () => {
    const isProgramPage = $('#program').length != 0;
    const programsContainer = $('.post.event'),
      artistsContainer = $('.post.artist');
    if(isProgramPage)
    {
      const $prog = $('#program .post');
      if(!$prog.data('progs')){
        programs = new Programs($prog);
        !$prog.data('progs', programs)
      }
      else{
        window.programs.filterByActiveFilters();
        window.programs.sendAllIn();
      }
      programs.filterBy(activeFilters);
      programs.sendAllIn();
      initFilters();

      function initFilters(){
        const filters = $('.filters [data-type]');
        $('.filters [data-type]').click((e) => {
          const clicked = $(e.currentTarget),
           value = clicked.data('value'),
           key = clicked.data('key'),
           type = clicked.data('type');
           $(`.filters li[data-value]`).toggleClass('active', value == 'reset');
           clicked.addClass('active');
           if((key && value) || key == 'reset'){
             activeFilters = { type, key, value };
             programs.filterBy(activeFilters);
           }
        });

        $('.filter-title').click( e => {
          const $this = $(e.currentTarget);
          const key = $this.data('key');
          $('.filter-title').removeClass('active');
          $this.addClass('active');
        });
      }
    }

    $('nav').on('scroll', e => e.preventDefault() )
    $(window).on('resize', debounce(programs.positionAll.bind(programs), 800));
  });

  $(document).on('turbolinks:before-visit', (e) => {
    const goingToProgramPage = /program/.test(e.originalEvent.data.url);
    if(!goingToProgramPage){
      const except = $(e.target).data('id');
      programs.sendAllOut({ except });
      if(!goingToProgramPage){
        $(document).trigger('close-drawer');
      }
    }
  });


  function reset(_$){
    _$.addClass('reset').removeClass('out in');
    document.body.offsetHeight;
    _$.removeClass('reset');
  }
})();
