import $ from 'jquery'

const INIT_MOVIE = 'INIT_MOVIE'
const IN_THEATERS = 'IN_THEATERS'
const  COMING_SOON = 'COMING_SOON'
const TOP50 = 'TOP50'

export default function (state,action) {
    if (!state) {
        return {
            data:[]
        }
    }
    switch(action.type){
        case INIT_MOVIE:
            // 初始化

            return { data: action.movie_list  }
        case IN_THEATERS:
            // 正在热映
            /*data = [...state.data, action.comments];*/
            state.data.push(action.comments)
            localStorage.setItem("comment",JSON.stringify(state.data));
            return {
                data: state.data
            }
        case TOP50:
            // top250
            state.data.splice(action.commentIndex,1);
            localStorage.setItem("comment",JSON.stringify(state.data));
            return {
                data: state.data
            }
        case COMING_SOON:

        default:
            return state
    }
}