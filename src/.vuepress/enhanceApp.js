function integrateGitalk (router) {
    const linkGitalk = document.createElement('link');
    linkGitalk.href = 'https://cdn.jsdelivr.net/npm/gitalk@1/dist/gitalk.css';
    linkGitalk.rel = 'stylesheet';
    document.body.appendChild(linkGitalk);
    const scriptGitalk = document.createElement('script');
    scriptGitalk.src = 'https://cdn.jsdelivr.net/npm/gitalk@1/dist/gitalk.min.js';
    document.body.appendChild(scriptGitalk);
    var path = '';
  
    router.afterEach((to) => {
        if (scriptGitalk.onload) {
            setTimeout(loadGitalk, 5, to)
        } else {
            scriptGitalk.onload = () => {
                loadGitalk(to.fullPath);
            }
        }
    });
  
    function loadGitalk (to) {
        if (to.path !== path) {
            path = to.path;
            let commentsContainer = document.getElementById('gitalk-container');
            const $page = document.querySelector('.page');
            if (commentsContainer && $page) {
                $page.removeChild(commentsContainer)
            }
            commentsContainer = document.createElement('div');
            commentsContainer.id = 'gitalk-container';
            commentsContainer.classList.add('content');
            if ($page) {
                $page.appendChild(commentsContainer);
                if (typeof Gitalk !== 'undefined' && Gitalk instanceof Function) {
                    renderGitalk();
                }
            }
        }
    }
    function renderGitalk () {
        const gitalk = new Gitalk({
            clientID: 'f0169e672cc67960134b',
            clientSecret: '63aecc5c696c7f0d19e0b5cf2a5e2417614d220d',
            repo: 'notes',
            owner: 'zhukunpenglinyutong',
            admin: ['zhukunpenglinyutong'],
            id: decodeURI(window.location.pathname),      // Ensure uniqueness and length less than 50
            createIssueManually: true
        });
        gitalk.render('gitalk-container');
    }
  
    window.loadGitalk = loadGitalk;
  
  }
  
  export default ({ Vue, options, router }) => {
    try {
        document && integrateGitalk(router)
    } catch (e) {
        console.error(e.message)
    }
  }