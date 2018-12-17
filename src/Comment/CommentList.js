import React from 'react'
import  Comment from './Comment'
class CommentList extends React.Component {
    constructor(){
        super();
        this.handleDeleteComment = this.handleDeleteComment.bind(this);
    }
    static defaultProps = {
        data: []
    }
    handleDeleteComment(index){
        this.props.deleteCommentList(index);
    }
    render(){
        let comments = this.props.data;
        return (
            <div>
                {
                    this.props.data.map( (comment,i) => {
                        return (
                            <Comment key={i} index={i} comment={comment} deleteComment={this.handleDeleteComment}/>
                        )
                    })

                }
            </div>
        )
    }
}

export default CommentList;