let helpers = {
    getQueryParameterByName: (name, url = window.location.href) => {
        name = name.replace(/[\[\]]/g, "\\$&");
        let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return true;
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    },
    openMobileNavMenu: () => {
        var navMenuToggleButton = document.querySelector('button[data-target="#navbar"]');
        if (navMenuToggleButton.classList.contains('collapsed')) navMenuToggleButton.click();
    },
    closeMobileNavMenu: () => {
        var navMenuToggleButton = document.querySelector('button[data-target="#navbar"]');
        if (!navMenuToggleButton.classList.contains('collapsed')) navMenuToggleButton.click();
    }
};


export default helpers;