

tinymce.init({
      selector: 'textarea',
      plugins: 'a11ychecker advcode casechange formatpainter linkchecker autolink lists checklist media mediaembed pageembed permanentpen powerpaste table advtable tinycomments tinymcespellchecker',
      toolbar: 'a11ycheck addcomment showcomments casechange checklist code formatpainter pageembed permanentpen table',
      toolbar_mode: 'floating',
      tinycomments_mode: 'embedded',
      tinycomments_author: 'Author name',
   });


/*tinymce.init({
    selector: "textarea#editor",
    skin: "bootstrap",
    plugins: "lists, link, image, media",
    toolbar:
      "h1 h2 bold italic strikethrough blockquote bullist numlist backcolor | link image media | removeformat help",
    menubar: false,
    setup: (editor) => {
      // Apply the focus effect
      editor.on("init", () => {
        editor.getContainer().style.transition =
          "border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out";
      });
      editor.on("focus", () => {
        (editor.getContainer().style.boxShadow =
          "0 0 0 .2rem rgba(0, 123, 255, .25)"),
          (editor.getContainer().style.borderColor = "#80bdff");
      });
      editor.on("blur", () => {
        (editor.getContainer().style.boxShadow = ""),
          (editor.getContainer().style.borderColor = "");
      });
    },
  });
  
  */