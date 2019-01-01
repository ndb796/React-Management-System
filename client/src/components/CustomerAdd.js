import React from 'react'
import { post } from 'axios';

class CustomerAdd extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      file: null,
      userName: '',
      birthday: '',
      gender: '',
      job: ''
    }
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.handleFileChange = this.handleFileChange.bind(this)
    this.handleValueChange = this.handleValueChange.bind(this)
    this.addCustomer = this.addCustomer.bind(this)
  }

  handleFormSubmit(e) {
    e.preventDefault()
    this.addCustomer()
    .then((response) => {
      console.log(response.data);
    })
  }

  handleFileChange(e) {
    let nextState = {};
    nextState[e.target.name] = e.target.files[0];
    this.setState(nextState);
  }
  
  handleValueChange(e) {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  addCustomer(){
    const url = '/api/customers';
    const formData = new FormData();
    formData.append('image', this.state.file)
    formData.append('name', this.state.userName)
    formData.append('birthday', this.state.birthday)
    formData.append('gender', this.state.gender)
    formData.append('job', this.state.job)
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    return post(url, formData, config)
  }

  render() {
    return (
        <form onSubmit={this.handleFormSubmit}>
          <h1>고객 추가</h1>
          프로필 이미지: <input type="file" name="file" onChange={this.handleFileChange} /><br/>
          이름: <input type="text" name="userName" onChange={this.handleValueChange} /><br/>
          생년월일: <input type="text" name="birthday" onChange={this.handleValueChange} /><br/>
          성별: <input type="text" name="gender" onChange={this.handleValueChange} /><br/>
          직업: <input type="text" name="job" onChange={this.handleValueChange} /><br/>
          <button type="submit">추가하기</button>
        </form>
      )
    }
  }

export default CustomerAdd