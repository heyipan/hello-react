import React from 'react'
import PropTypes from 'prop-types'
import wrappedComponent from '../WrappedComponent'
class CommentInput extends React.Component{
    constructor(props){
        super(props);
        this.state={
            username:props.data
        }
    }
    /*组件参数验证*/
    static propTypes = {
        commentSubmit: PropTypes.func
    }
    /*组件加载完成后 获取焦点*/
    componentDidMount(){
        /*const username = this._loadUsername();
        if(username) {
            this.setState({
                username:username
            })
        }*/
        this.textarea.focus();
    }
    /*从loacalStorage 加载用户名*/
    _loadUsername(){
       const username = localStorage.getItem("username");
       return username;

    }
    /*保存localStorage*/
    _saveUsername(username){
        /*localStorage.setItem("username",username);*/
        this.props.saveComment(username);
    }
    handelSaveUsername(){
        this._saveUsername(this.input.value);
    }
    handleValueChange(){
        this.setState({
            username:this.input.value
        });
    }
    /*提交建议*/
    submit(event){
        event.preventDefault();
        if (!this.input.value) return alert('请输入用户名');
        if (!this.textarea.value) return alert('请输入评论内容');
        /*调用父组件的方法 更新state*/
        this.props.commentSubmit({
            username:this.input.value,
            comment:this.textarea.value,
            createTime:+new Date()
        });
        /*清空表单*/
        this.textarea.value="";
    }
    render(){
        return (
            <div className="comment-input" onSubmit={this.submit.bind(this)}>
                <form >
                    <div className="comment-field">
                        <span className="comment-field-name">用户名</span>
                        <div className="comment-field-input">
                            <input type="text" value={this.state.username} onChange={this.handleValueChange.bind(this)}  onBlur={this.handelSaveUsername.bind(this)} ref={(input) => this.input = input}/>
                        </div>
                    </div>
                    <div className="comment-field">
                        <span className="comment-field-name">内容</span>
                        <div className="comment-field-input">
                            <textarea  ref={(textarea) => this.textarea = textarea}/>
                        </div>
                    </div>
                    <div className="comment-field-button" >
                        <div className="comment-field-input" ></div>
                        <button >确认提交</button>{/*onSubmit 应该绑定在 form 上  button 建议绑定 click*/}
                    </div>
                </form>
            </div>
        )
    }
}
CommentInput = wrappedComponent(CommentInput,"username");
export default CommentInput;