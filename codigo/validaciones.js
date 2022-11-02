const d = document;
export default function contactFormValidations() {
  const $form = d.querySelector(".contact-form");
  const $inputs = d.querySelectorAll(".contact-form [required]");
  //console.log($inputs)

  $inputs.forEach((input) => {
    //Para crear los comentarios abajo del input
    const $span = d.createElement("span");
    $span.id = input.name;
    $span.textContent = input.title;
    $span.classList.add("contact-form-error", "none");
    input.insertAdjacentElement("afterend", $span);
  });

  d.addEventListener("keyup", (e) => {
    if (e.target.matches(".contact-form [required]")) {
      let $input = e.target;
      let pattern = $input.pattern || $input.dataset.pattern; //esto es para detectar el atributo pattern que creamos en html

      //console.log($input,pattern)
      if (pattern && $input.value !== "") {
        //console.log("el input tiene patron")
        let regex = new RegExp(pattern);
        return !regex.exec($input.value)
          ? d.getElementById($input.name).classList.add("is-active")
          : d.getElementById($input.name).classList.remove("is-active");
      }

      if (!pattern) {
        // console.log("el input NO tiene patron")
        return $input.value === ""
          ? d.getElementById($input.name).classList.add("is-active")
          : d.getElementById($input.name).classList.remove("is-active");
      }
    }
  });

  d.addEventListener("submit", (e) => {
    e.preventDefault();
    //alert("Enviando formulario")

    const $loader = d.querySelector(".contact-form-loader");
    const $response = d.querySelector(".contact-form-response"); //respuesta

    $loader.classList.remove("none");
    setTimeout(() => {
      $loader.classList.add("none");
      $response.classList.remove("none");
      $form.reset();

      setTimeout(() => $response.classList.add("none"), 2000);
    }, 3000);
  });
}
