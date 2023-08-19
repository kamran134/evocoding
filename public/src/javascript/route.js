const findPath = par => par.slice(par.lastIndexOf('/'));

const route = event => {
    event = event || window.event;
    event.preventDefault();
    window.history.pushState({}, "", event.target.href);
    handleLocation();
};

const routes = {
    "/admin": "home",
    "/education": "education",
    "/educationappeal": "educationappeal",
    "/vacancyappeal": "vacancyappeal",
    "/vacancy": "vacancy",
    "/error": "error",
}

const handleLocation = async () => {
    let path = window.location.pathname;
    path = findPath(path);
    const route = routes[path] || routes["error"];
    const html = await fetch(`/src/pages/${route}.html`).then(data => data.text());
    document.getElementById('admin__target').innerHTML = html;
    addScriptFile(routes[path]);
}

window.onpopstate = handleLocation;
window.route = route;
handleLocation();

function addScriptFile(par) {
    {
        const element = document.getElementById('dynamicjs');
        element && element.remove();
    }
    const scriptEle = document.createElement("script");
    scriptEle.setAttribute("src", `/src/javascript/pages/admin/${par}.js?${Math.random()}`);
    scriptEle.setAttribute('type', 'module');
    scriptEle.id = 'dynamicjs';
    document.body.appendChild(scriptEle);
}

