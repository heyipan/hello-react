import React from 'react'

export default (WrappedComponent,name) => {
    class getLocalStorage extends React.Component{
        constructor(){
            super();
            this.state = {
                data: null
            }
        }
        componentWillMount(){
            let data = JSON.parse(localStorage.getItem(name));
            try {
                // 尝试把它解析成 JSON 对象
                if(data) {
                    this.setState({ data: data });
                }else {
                    this.setState({ data: [] });
                }
            } catch (e) {
                // 如果出错了就当普通字符串读取
                this.setState({ data })
            }
        }
        /*保存数据*/
        saveComment(data){
            try {
                // 尝试把它解析成 JSON 字符串
                localStorage.setItem(name, JSON.stringify(data))
            } catch (e) {
                // 如果出错了就当普通字符串保存
                localStorage.setItem(name, `${data}`)
            }
        }

        render(){
            return (
                <WrappedComponent data={this.state.data} saveComment={this.saveComment.bind(this)} {...this.props} />
            )
        }
    }

    return getLocalStorage;
}