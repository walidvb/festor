let ABSOLUTE_START;
const HOUR_IN_PX = 18,
  DAY_GAP = 18*4;
class Program{
  constructor({ elem, dateStart, dateEnd, section }){
    this.elem = elem;
    this.dateStart = new Date(dateStart);
    this.day = this.dateStart.getDate();
    this.dateEnd = new Date(dateEnd);
    this.section = section;
    this.duration = this.dateEnd - this.dateStart;
    this.hoursFromStart = (this.dateStart - ABSOLUTE_START)/(1000*60*60);
  }
  position(maxY){
    let posY = this.hoursFromStart*HOUR_IN_PX;
    this.elem.prepend(posY + '-' + maxY)
    posY = Math.min(posY, maxY);
    this.elem.css({
      position: 'absolute',
      transform: `translateY(${posY}px)`
    });
    return posY;
  }
  positionAndReturnNextMaxY(maxY){
    return this.position(maxY) + this.elem.height();
  }
}

class Programs{
  constructor(posts){
    this.programs = [];
    ABSOLUTE_START = new Date($('#program').data('date-start'));
    for (var i = 0; i < posts.length; i++) {
      const elem = $(posts[i]);
      const dateStart = elem.data('date-start'),
        dateEnd = elem.data('date-end'),
        section = elem.data('section');
      this.programs.push(new Program({ elem, dateStart, dateEnd, section }));
    }
  }
  positionAll(){
    let maxY = 0;
    let currDay = this.programs[0].day;
    let dayStart = 0;
    this.programs.forEach((prog) => {
      if(currDay != prog.day){
        maxY += DAY_GAP;
      }
      currDay = prog.day;
      maxY = prog.positionAndReturnNextMaxY(maxY)
    });
  }
}
$(document).on('turbolinks:load', () => {
  const isProgramPage = $('#program').length != 0;
  let programs;
  if(isProgramPage)
  {
    const $prog = $('#program .post');
    programs = new Programs($prog);
    programs.positionAll();
    window.programs = programs;
  }
});
