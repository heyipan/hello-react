import React from 'react'
import CommentInput from './CommentInput'
import CommentList from './CommentList'
import wrappedComponent from '../WrappedComponent'


class CommentApp extends React.Component{
    constructor(props) {
        super(props);
        /*设置state的初始值*/
        this.state={
           data:props.data
        }
        /*绑定事件*/
        this.commentSubmit = this.commentSubmit.bind(this);
        this.handleDeleteComment = this.handleDeleteComment.bind(this)
    }
    /*删除数据*/
    handleDeleteComment(index){
        let data = this.state.data;
        /*删除index位置的数据*/
        data.splice(index,1);
        localStorage.setItem("comment",JSON.stringify(data));
        this.setState({
            data:data
        });
        this.props.saveComment(data);

    }
    commentSubmit(comment){
        let  data = this.state.data;
        data.push(comment);
        this.setState({
            data:data
        });
        this.props.saveComment(data);

    }
    render(){
        return (
            <div className="wrapper">
                <CommentInput commentSubmit={this.commentSubmit}/>
                <CommentList data={this.state.data} deleteCommentList={this.handleDeleteComment.bind(this)}/>
            </div>
        )
    }

}
CommentApp = wrappedComponent(CommentApp,"comment");
export default CommentApp