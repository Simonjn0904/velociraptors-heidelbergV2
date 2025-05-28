// Darkmode-Logik deaktiviert
const sitePreference = document.documentElement.getAttribute("data-default-appearance");
const userPreference = localStorage.getItem("appearance");

// Diese Bedingung bewirkt nichts mehr
// document.documentElement.classList.add("dark");

if (document.documentElement.getAttribute("data-auto-appearance") === "true") {
  // Keine Reaktion mehr auf System-Darkmode
  // window.matchMedia(...).matches
  // document.documentElement.classList.add("dark");
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (event) => {
    // Keine Änderungen an Klassen
  });
}

window.addEventListener("DOMContentLoaded", (event) => {
  const switcher = document.getElementById("appearance-switcher");
  const switcherMobile = document.getElementById("appearance-switcher-mobile");

  updateMeta();
  this.updateLogo?.(getTargetAppearance());

  // Umschaltlogik deaktiviert
  if (switcher) {
    switcher.addEventListener("click", () => {
      // Kein toggle von .dark, keine Speicherung
      updateMeta();
      this.updateLogo?.(getTargetAppearance());
    });
    switcher.addEventListener("contextmenu", (event) => {
      event.preventDefault();
      localStorage.removeItem("appearance");
    });
  }
  if (switcherMobile) {
    switcherMobile.addEventListener("click", () => {
      // Kein toggle von .dark, keine Speicherung
      updateMeta();
      this.updateLogo?.(getTargetAppearance());
    });
    switcherMobile.addEventListener("contextmenu", (event) => {
      event.preventDefault();
      localStorage.removeItem("appearance");
    });
  }
});

var updateMeta = () => {
  var elem, style;
  elem = document.querySelector('body');
  style = getComputedStyle(elem);
  document.querySelector('meta[name="theme-color"]').setAttribute('content', style.backgroundColor);
}

// Logo-Logik bleibt erhalten
{{ if and (.Site.Params.Logo) (.Site.Params.SecondaryLogo) }}
{{ $primaryLogo := resources.Get .Site.Params.Logo }}
{{ $secondaryLogo := resources.Get .Site.Params.SecondaryLogo }}
{{ if and ($primaryLogo) ($secondaryLogo) }}
var updateLogo = (targetAppearance) => {
  var imgElems = document.querySelectorAll("img.logo");
  var logoContainers = document.querySelectorAll("span.logo");

  targetLogoPath = 
    targetAppearance == "{{ .Site.Params.DefaultAppearance }}" ?
    "{{ $primaryLogo.RelPermalink }}" : "{{ $secondaryLogo.RelPermalink }}"
  for (const elem of imgElems) {
    elem.setAttribute("src", targetLogoPath)
  }

  {{ if eq $primaryLogo.MediaType.SubType "svg" }}
  targetContent = 
    targetAppearance == "{{ .Site.Params.DefaultAppearance }}" ?
    `{{ $primaryLogo.Content | safeHTML }}` : `{{ $secondaryLogo.Content | safeHTML }}`
  for (const container of logoContainers) {
    container.innerHTML = targetContent;
  }
  {{ end }}
}
{{ end }}
{{- end }}

// Immer "light", da kein .dark mehr vorhanden
var getTargetAppearance = () => {
  return "light";
}

window.addEventListener("DOMContentLoaded", (event) => {
  const scroller = document.getElementById("top-scroller");
  const footer = document.getElementById("site-footer");
  if(scroller && footer && scroller.getBoundingClientRect().top > footer.getBoundingClientRect().top) {
    scroller.hidden = true;
  }
});
