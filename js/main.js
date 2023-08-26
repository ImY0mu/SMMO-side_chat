var isReady = true;

document.addEventListener('DOMContentLoaded', (event) => {
  if(isReady == false) return;

  isReady = false;
  console.log("Extension loaded.");

  getRequiredScript(window.location.href.toString())
  .then(data = (data) => {
    var script = document.createElement('script');
    script.className = "Extension_chat_customization";
    script.innerHTML = data;
    script.onload = function() {
      this.remove();
    };
    (document.head || document.documentElement).appendChild(script);
  })
  .catch(error => console.log(error));
});

const getRequiredScript = async () => {
    return `

    function prepareChat(){
        try{
            setupChat();
            updateChatButton();
        }
        catch(e){
            console.warn("Chat is not available");
        }
    }

    function setupChat(){
        var game_parent = document.body.querySelector('.h-screen.flex.overflow-hidden.bg-gray-100');
        var chat_parent = document.querySelector("iframe").parentElement.parentElement;
        
        chat_parent.style = 'display: flex; flex-direction: column;';
        chat_parent.remove();

        game_parent.insertAdjacentElement('beforeend', chat_parent);

        var chat_box = document.getElementById('chatBox');
        chat_box.setAttribute('class', '');


        if(docCookies.getItem('show_chat') == 'true'){
          chat_box.style = 'height: calc(100% - 4rem); margin-top: auto;';

          return;
        }

        chat_box.style = 'height: calc(100% - 4rem); margin-top: auto; display: none;';
    }

    function updateChatButton(){
        var button = document.getElementById('show_hide_chat_btn');

        button.style = 'position: relative; top: 1rem; left: 1rem;';

    }

    prepareChat();
    
    `;
};