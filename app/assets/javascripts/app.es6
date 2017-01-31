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
  }
  position(){
    const y = this.hoursFromStart*HOUR_IN_REM;
    this.elem.css({
      transform: `translateY(${y}rem)`
    });
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
    this.programs.forEach(prog => prog.position())
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
  }
});
