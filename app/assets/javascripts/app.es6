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
    this.conflictCount = 0;
  }
  setTop(posY, skippedHours){
    this.posY = posY;
    this.elem.css({
      position: 'absolute',
      transform: `translateY(${posY}px)`
    });
  }
  addConflict(conflictCount, posInConflict){
    this.conflictCount = conflictCount;
    this.elem.attr("data-conflict-count", this.conflictCount);
    this.elem.attr("data-conflict-position", posInConflict);
    console.log(this.elem, `translateY(${this.posY}px) translateX(${posInConflict*100}%)`);
    this.elem.css({
      transform: `translateY(${this.posY}px) translateX(${posInConflict*100}%)`,
    })
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
      conflictCount = 0;
    this.programs.forEach((prog, i) => {
      let basePosY = prog.hoursFromStart*HOUR_IN_PX;
      let oldGap = gap;
      if(minY < basePosY){
        gap = Math.max(0, oldGap, basePosY - minY);
        basePosY = Math.min(minY, basePosY - oldGap);
      }
      prog.setTop(basePosY);
      
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
  if(isProgramPage)
  {
    const $prog = $('#program .post');
    programs = new Programs($prog);
    programs.positionAll();
    window.programs = programs;
  }
});
