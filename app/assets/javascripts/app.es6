let ABSOLUTE_START;
const HOUR_IN_REM = 1;
class Program{
  constructor({ elem, dateStart, dateEnd, section }){
    this.elem = elem;
    this.dateStart = new Date(dateStart);
    this.dateEnd = new Date(dateEnd);
    this.section = section;
    this.duration = this.dateEnd - this.dateStart;
    this.hoursFromStart = (this.dateStart - ABSOLUTE_START)/(1000*60*60);
    this.position();
  }
  position(){
    const y = this.hoursFromStart*HOUR_IN_REM;
    this.elem.css({
      transform: `translateY(${y}rem)`
    });
  }
}

$(document).on('turbolinks:load', () => {
  const isProgramPage = $('#program').length != 0;
  ABSOLUTE_START = new Date($('#program').data('date-start'));
  if(isProgramPage)
  {
    const $prog = $('#program .post');
    let programs = [];
    for (var i = 0; i < $prog.length; i++) {
      const elem = $($prog[i]);
      const dateStart = elem.data('date-start'),
        dateEnd = elem.data('date-end'),
        section = elem.data('section');

      programs.push(new Program({ elem, dateStart, dateEnd, section }));
    }
    console.log(programs);
  }


});
