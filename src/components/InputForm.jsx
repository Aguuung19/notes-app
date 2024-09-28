import React from "react";


class InputForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      body: "",
      titleCharLimit: 50,
    };

    this.onChangeTitleHandler = this.onChangeTitleHandler.bind(this);
    this.onChangeBodyHandler = this.onChangeBodyHandler.bind(this);
    this.onSubmitEventhandler = this.onSubmitEventhandler.bind(this);
  }

  onChangeTitleHandler(event) {
    const title = event.target.value;

    this.setState((prevState) => ({
      title,
      titleCharLimit: 50 - title.length,
    }));
  }

  onChangeBodyHandler(event) {
    this.setState(() => {
      return {
        body: event.target.value,
      };
    });
  }

    onSubmitEventhandler(event) {
        event.preventDefault();      
        this.props.addNote(this.state);
        this.setState({
            title: '',
            body:'',
        });
  }

  render() {
    return (
      <form className="note-input" onSubmit={this.onSubmitEventhandler}>
        <h2>Buat Catatan</h2>
        <p className="note-input__title__char-limit">
          {this.state.titleCharLimit} sisa karakter
        </p>
        <input
          id="title"
          type="text"
          placeholder="judul"
          value={this.state.title}
                onChange={this.onChangeTitleHandler}
                maxLength={50}
        />
        <br />
        <textarea
          id="body"
          placeholder="isi catatan"
          value={this.state.body}
          onChange={this.onChangeBodyHandler}
        />
        <br />

        <button type="submit">submit</button>
      </form>
    );
  }
}

export default InputForm;