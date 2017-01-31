class Program{
  constructor({ elem, dateStart, dateEnd, section }){
    this.elem = elem;
    this.dateStart = new Date(dateStart);
    this.dateEnd = new Date(dateEnd);
    this.section = section;
  }
}

$(document).on('turbolinks:load', () => {
  const isProgramPage = $('#program').length != 0;
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
