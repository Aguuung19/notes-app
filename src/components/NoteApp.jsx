import React from "react";
import NoteItemList from "./NoteItemList";
import SearchBar from "./SearchBar";
import InputForm from "./InputForm";
import { getInitialData } from "../utils";

class NoteApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: getInitialData(),
        searchQuery: "",
    };

    this.onDeleteHandler = this.onDeleteHandler.bind(this);
    this.onArchiveHandler = this.onArchiveHandler.bind(this);
      this.handleSearchChange = this.handleSearchChange.bind(this);
      this.onAddNoteHandler = this.onAddNoteHandler.bind(this);
  }

  // Fungsi untuk menghapus catatan
  onDeleteHandler(id) {
    const notes = this.state.notes.filter((note) => note.id !== id);
    this.setState({ notes });
  }

  // Fungsi untuk mengarsipkan atau membatalkan arsip catatan
  onArchiveHandler(id) {
    const notes = this.state.notes.map((note) =>
      note.id === id ? { ...note, archived: !note.archived } : note
    );
    this.setState({ notes });
  }

  // Fungsi untuk menangani perubahan input pencarian
  handleSearchChange(event) {
    this.setState({ searchQuery: event.target.value });
    }
    
    onAddNoteHandler({ title, body }) {
        this.setState((prevState) => {
            return {
                notes: [
                    ...prevState.notes,
                    {
                        id: +new Date(),
                        title,
                        body,
                        createdAt: Date(),
                        archived: false,
                    }
                ]
            }
        });
    }

  render() {
    const { searchQuery, notes } = this.state;

    // Filter catatan berdasarkan pencarian
    const filteredActiveNotes = notes.filter(
      (note) =>
        !note.archived &&
        note.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredArchivedNotes = notes.filter(
      (note) =>
        note.archived &&
        note.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <div className="note-app">
        <div className="note-app__header">
          <h1>Aplikasi Notes</h1>

          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={this.handleSearchChange}
          />
        </div>
            <div className="note-app__body">
                <InputForm addNote={this.onAddNoteHandler} />
                <br />
          <h2>Catatan Aktif</h2>
          <NoteItemList
            notes={filteredActiveNotes}
            onDelete={this.onDeleteHandler}
            onArchive={this.onArchiveHandler}
          />
          <h2>Catatan Arsip</h2>
          <NoteItemList
            notes={filteredArchivedNotes}
            onDelete={this.onDeleteHandler}
            onArchive={this.onArchiveHandler}
          />
        </div>
      </div>
    );
  }
}

export default NoteApp;
