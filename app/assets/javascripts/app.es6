let ABSOLUTE_START;
const HOUR_IN_PX = 36,
  DAY_GAP = 18*4;
class Program{
  constructor({ elem, dateStart, dateEnd, section }){
    this.elem = elem;
    this.dateStart = new Date(dateStart);
    this.day = this.dateStart.getDate();
    this.dateEnd = new Date(dateEnd);
    this.section = section;
    this.duration = this.dateEnd - this.dateStart;
    this.durationInHour = this.duration/(1000*60*60)
    this.hoursFromStart = (this.dateStart - ABSOLUTE_START)/(1000*60*60);
  }
  setTop(posY, skippedHours){
    // this.elem.prepend($(`<div> ${hour} ${this.hoursFromStart} ${skippedHours}</div>`));
    // this.elem.find('.event-name').text(`${hour} ${this.hoursFromStart} ${skippedHours}`)
    this.posY = posY;
    this.elem.css({
      position: 'absolute',
      transform: `translateY(${posY}px)`
    });
  }
  endPos(){
    return this.elem.outerHeight() + this.posY;
  }
}

class Programs{
  constructor(posts){
    this.programs = [];
    ABSOLUTE_START = new Date($('#program').data('date-start'));
    console.log('ABSOLUTE_START', ABSOLUTE_START);
    for (var i = 0; i < posts.length; i++) {
      const elem = $(posts[i]);
      const dateStart = elem.data('date-start'),
        dateEnd = elem.data('date-end'),
        section = elem.data('section');
      this.programs.push(new Program({ elem, dateStart, dateEnd, section }));
    }

  }
  positionAll(){
    let minY = 0,
      gap = 0,
      lastHourEnd;
    this.programs.forEach((prog) => {
      let basePosY = prog.hoursFromStart*HOUR_IN_PX;
      let oldGap = gap;
      if(minY < basePosY){
        gap = Math.max(0, oldGap, basePosY - minY);
        basePosY = Math.min(minY, basePosY - oldGap);
      }
      const el  = prog.elem[0], normalBasePosY = prog.hoursFromStart*HOUR_IN_PX;
      console.log({
        minY,
        gap,
        basePosY,
        normalBasePosY,
        endPos: basePosY + 179,
        el,
      });
      prog.setTop(basePosY);
      minY = Math.max(prog.endPos(), minY);
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
