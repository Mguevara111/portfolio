let $burgerbtn=document.querySelector('.hamburger');
let $menuoptions=document.querySelector('.menu__options');
let $menu=document.querySelector('.menu');
let $form=document.querySelector('.contact__form');


document.addEventListener('click',(e)=>{
    if(e.target.matches('.hamburger') || e.target.matches('.hamburger-box') || e.target.matches('.hamburger-inner')){
       //console.log(e.target)
        $burgerbtn.classList.toggle('is-active')
        $menu.classList.toggle('menu--single')
        $menuoptions.classList.toggle('menu__options--show')

    } 

    if(e.target.matches('.menu-home')){
      $burgerbtn.classList.toggle('is-active')
        $menu.classList.toggle('menu--single')
        $menuoptions.classList.toggle('menu__options--show')
    }
})

$form.addEventListener('submit',(e)=>{
    e.preventDefault();
    let fd=new FormData(e.target)
    let status = document.getElementById("my-form-status");
    let objform=Object.fromEntries(fd.entries())
    //console.log(objform)

     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
     const otherregex = /^[a-zA-Z0-9 ]*$/;

     if(!otherregex.test(objform.name) && !otherregex.test(objform.subject)){
        status.innerHTML='Please enter only letters and numbers'
        return;
     }

     if(!emailRegex.test(objform.email)){
        status.innerHTML='Please enter a valid mail'
        return;
     }

    
    fetch(e.target.action, {
                method: $form.method,
                body: fd,
                headers: {
                    'Accept': 'application/json'
                }
    }).then(response => {
      if (response.ok) {
        status.innerHTML = "Thanks for your submission!";
        $form.reset();
        erasestatus(status)
      } else {
        response.json().then(data => {
          if (Object.hasOwn(data, 'errors')) {
            status.innerHTML = data["errors"].map(error => error["message"]).join(", ")
          } else {
            status.innerHTML = "Oops! There was a problem submitting your form"
          }
        })
      }
    }).catch(error => {
      status.innerHTML = "Oops! There was a problem submitting your form"
    });
  
})

function erasestatus(element){
    setTimeout(()=>{
        element.innerHTML='';
    },4000)
}
