function showPage(pageId) {
    document.getElementById("formPage").style.display = "none";
    document.getElementById("mainPage").style.display = "none";

    document.getElementById(pageId).style.display = "block";

    history.pushState({page: pageId}, pageId, `#${pageId}`);
}

const form = document.getElementById("registrationForm");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    showPage("mainPage")
});