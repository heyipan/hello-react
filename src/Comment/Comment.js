import React from 'react'
import PropTypes from 'prop-types'
class Comment extends React.Component{
    static defaultProps = {
        comment: PropTypes.object.isRequired
    }
    constructor(){
        super();
        this.state={
            timeString:''
        }
    }
    componentWillMount(){
        this._updataTimeString();
        this._timer = setInterval(this._updataTimeString.bind(this),5000);
    }
    componentWillUnmount(){
        clearInterval(this._timer);
    }
    _updataTimeString(){
        const timeString = this.props.comment.createTime;
        const time = (+Date.now() - timeString)/1000;
        const minute = Math.round(time / 60);
        const second = Math.ceil(time);
        this.setState({
            timeString:(minute>1?minute+"分钟前":second+"秒前")
        })

    }
    handleDeleteComment(){
         let index = this.props.index;
         console.log(index);
         this.props.deleteComment(index);
    }
    _getProcessedContent(content){
        return content.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;").replace(/`([\S\s]+?)`/g, '<code>$1</code>')
    }
    render(){
        return (
            <div>
                <div className='comment'>
                    <div className='comment-user'>
                        <span>{this.props.comment.username} </span>：
                    </div>
                    <p dangerouslySetInnerHTML={{__html: this._getProcessedContent(this.props.comment.comment)}} />
                    <span className='comment-createdtime'>
                        {this.state.timeString}
                    </span>
                    <span className='comment-delete' onClick={this.handleDeleteComment.bind(this)}>
                        删除
                    </span>
                </div>
            </div>


        )
    }
}

export default Comment;