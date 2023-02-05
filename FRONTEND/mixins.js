const CDA_SESSION = 'cda_session';
export const mixins = {
    methods: {
        saveSession(data){
            localStorage.setItem(CDA_SESSION, JSON.stringify(data));
        },
        removeSession(){
            localStorage.removeItem(CDA_SESSION);
        },
        isSessionSetted() {
            return (localStorage.getItem(CDA_SESSION) != null)
        },
        getToken(){
            return JSON.parse(localStorage.getItem(CDA_SESSION))['token'];
        },
        addFaceDetection(url) {
            return url.replace('image/upload/', 'image/upload/c_fill,c_thumb,g_face,w_650,h_650/');
        }
    },
}