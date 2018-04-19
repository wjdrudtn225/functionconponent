import React, {Component} from 'react'
import FormSet from './FormSet'

export default class FormUse extends Component {
    constructor(props){
        super(props)

        this.state = {
            email: '',
            tel: '',
            all: false
        }
        this.oks = {}
    }

    handleChange(e){
        this.oks[e.name] = e.isOK
        this.setState({
            [e.name]: e.value,
            all: (this.oks['email'] && this.oks['tel'])
        })
    }

    handleSubmit(e) {
        window.alert(JSON.stringify(this.state))
        e.preventDefault()
    }

    render() {
        const doChange = e => this.handleChange(e)
        const doSubmit = e => this.handleSubmit(e)
        const emailPat = /^[a-zA-Z0-9.!#$%&'*+/=?^_'{:}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        const asciiFilter =/[^\u0020-\u007e]+/g
        const telFilter = /[^0-9-()+]/g
        const telPat = /^[0-9-()+]+$/
        return(
            <form onSubmit={doSubmit}>
                <FormSet name='email' label='메일 주소'
                value={this.state.email}
                filter={asciiFilter}
                pattern={emailPat}
                onChange={doChange}/>

                <FormSet name='tel' label='전화 번호'
                value={this.state.tel}
                filter={telFilter}
                pattern={telPat}
                onChange={doChange}/>

                <input type='submit' value='전송'
                       disabled={!this.state.all} />
            </form>
        )
    }
}

