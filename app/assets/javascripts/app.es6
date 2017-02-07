let ABSOLUTE_START;
const HOUR_IN_PX = 36,
  DAY_GAP = 18*4,
  PERSPECTIVE = '20px',
  NORMAL_Z = 2,
  MIN_Z = 20,
  OUT_Z = 55,
  MIN_Z_DELTA = 8;

class Program{
  constructor({ elem, dateStart, dateEnd, section, venue }){
    this.elem = elem;
    this.type = elem.hasClass('artist') ? 'artist' : 'event';
    this.eventID = elem.data('event-id');
    this.venue = venue;
    this.dateStart = new Date(dateStart);
    this.date = `${this.dateStart.getDate()}-${this.dateStart.getMonth()+1}`;
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
  }
  _bindHover(){
    const thumbnail = $(`.thumbnails [data-event-id="${this.eventID}"]`);
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
    console.log({ type, key, value });
    if(!this.isOut){
      console.log(this.section, this.type, this[key] == value);
    }
    this.active = ((value == 'reset') || (this[key] == value));
    this.setTransform();
  }
  // position
  position(posY){
    this.posY = posY;
    this.elem.css({
      position: 'absolute',
    });
    this.setTransform();
  }
  addConflict(conflictCount, posInConflict){
    this.conflictCount = conflictCount;
    this.elem.attr("data-conflict-count", this.conflictCount);
    this.elem.attr("data-conflict-position", posInConflict);
    this.posX = posInConflict*100;
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
    this.elem.css({
      transform: `translate3D(${this.posX}%, ${this.posY}px, ${posZ}px)`
    })
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
}


function rdmZBack(){
  return -(Math.floor(Math.random() * MIN_Z_DELTA) + MIN_Z);
}
function rdmZFront(){
  return -(Math.floor(Math.random() * NORMAL_Z));
}
function rdmZOut(){
  return -(Math.floor(Math.random())*MIN_Z_DELTA/2 + OUT_Z);
}
class Programs{
  constructor(posts){
    this.programs = [];
    this.artists = [];
    this.container = $('#program');
    ABSOLUTE_START = new Date(this.container.data('date-start'));
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
      }
    }
    this.container.css({
      perspective: PERSPECTIVE,
      perspectiveOrigin: `50% ${50}vh`,
    })
  }
  filterBy(keyValue){
    this.activeFilter = keyValue;
    console.log(keyValue);
    // if(keyValue.key == 'artists'){
    //   this.programs.forEach( prog => prog.out(true) );
    //   this.artists.forEach( art => art.out(false) );
    // }
    // else{
    // }
    this.programs.forEach( prog => prog.testAndActivate(keyValue) );
    this.artists.forEach( art =>  art.testAndActivate(keyValue) );
    this.positionAllByTime();
  }
  positionAllByTime(){
    let minY = 0,
      gap = 0,
      conflictCount = 0,
      currDate;
    this.programs.forEach((prog, i) => {
      let basePosY = prog.hoursFromStart*HOUR_IN_PX;
      let oldGap = gap;
      if(minY < basePosY){
        gap = Math.max(0, oldGap, basePosY - minY);
        basePosY = Math.min(minY, basePosY - oldGap);
      }
      if(currDate != prog.date){
        $(`.legend .day[data-date="${prog.date}"]`).css({
          transform: `translateY(${basePosY}px)`,
        });
      }
      currDate = prog.date;
      prog.position(basePosY);

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
      minY = Math.max(prog.endPos(), minY);
    });
  }
}

$(document).on('turbolinks:load', () => {
  const isProgramPage = $('#program').length != 0;
  let programs;
  window.programs = programs;
  const programsContainer = $('.post.event'),
    artistsContainer = $('.post.artist');
  if(isProgramPage)
  {
    const $prog = $('#program .post');
    programs = new Programs($prog);
    programs.positionAllByTime();
    programs = programs;
    initFilters();

    function initFilters(){
      const filters = $('.filters [data-type]');
      $('.filters [data-type]').click((e) => {
        const clicked = $(e.currentTarget),
         value = clicked.data('value'),
         key = clicked.data('key'),
         type = clicked.data('type');
         console.log(type, key, value);
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
});

function reset(_$){
  _$.addClass('reset').removeClass('out in');
  document.body.offsetHeight;
  _$.removeClass('reset');
}
