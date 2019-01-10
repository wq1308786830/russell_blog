const domains =  {
    production: 'http://47.112.23.45:5001',
    development: 'http://localhost:5001'
};

function getCurrentDomain (env) {
    if (env === 'production') return domains.production;
    else if (env === 'development') return domains.development;
}

exports.domains = domains;
exports.getCurrentDomain = getCurrentDomain;