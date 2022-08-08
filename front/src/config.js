var config = {
    GetProfileURL:'http://localhost:5004/api/auth/profile',
    loginURL: 'http://localhost:5004/api/auth/login',
    registerURL: 'http://localhost:5004/api/auth/register',
    changePasswordURL: 'http://localhost:5004/api/auth/changePassword',
    editProfileURL: 'http://localhost:5004/api/auth/editProfile',
    resetPasswordURL:"http://localhost:5004/api/auth/resetPassword",
    addUrl:'http://localhost:5003/api/favorite/addToFavorite',
    removeUrl:'http://localhost:5003/api/favorite/removeFavorite',
    catUrl:'http://localhost:5001/api/category',
    getUrl: 'http://localhost:5003/api/favorite/getFavorite',
    popularUrl:'http://localhost:5001/api/mostpopular',
    searchUrl:'http://localhost:5001/api/search'
}
export default config;