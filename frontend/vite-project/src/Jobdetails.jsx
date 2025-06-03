// JobDetails.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getJob, updateJob, deleteJob } from "./utils/apis";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faBuilding, 
    faCalendarAlt, 
    faBriefcase, 
    faChevronLeft, 
    faPencilAlt, 
    faTrashAlt,
    faCheckCircle,
    faTimesCircle,
    faStickyNote,
    faPlus
} from '@fortawesome/free-solid-svg-icons';
import "./JobDetails.css";

const JobDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [job, setJob] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState("");

    useEffect(() => {
        getJob(id).then(data => setJob(data.Item));
    }, [id]);

    const toggleEditMode = () => {
        setEditMode(!editMode);
    };

    const handleUpdate = () => {
        updateJob(id, job).then(() => toggleEditMode());
    };

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this job?')) {
            deleteJob(id).then(() => navigate("/"));
        }
    };

    const goToHome = () => {
        navigate("/");
    };

    const addNote = () => {
        if (newNote.trim()) {
            setNotes([
                ...notes,
                {
                    id: Date.now(),
                    text: newNote,
                    date: new Date().toISOString().split('T')[0]
                }
            ]);
            setNewNote("");
        }
    };

    const deleteNote = (noteId) => {
        setNotes(notes.filter(note => note.id !== noteId));
    };

    if (!job) return (
        <div className="details-loading">
            <div className="loading-spinner"></div>
            <p>Loading job details...</p>
        </div>
    );

    const getStatusClass = (status) => {
        const statusLower = status.toLowerCase();
        return `status status-${statusLower}`;
    };

    return (
        <div className="details-container">
            <div className="details-header">
                <button className="back-button" onClick={goToHome}>
                    <FontAwesomeIcon icon={faChevronLeft} /> Back
                </button>
                <h1>Job Details</h1>
            </div>
            
            <div className="details-content-wrapper">
                <div className="details-card">
                    {editMode ? (
                        <div className="edit-form">
                            <div className="form-header">
                                <FontAwesomeIcon icon={faPencilAlt} className="form-icon" />
                                <h2>Edit Job Application</h2>
                            </div>
                            
                            <div className="form-content">
                                <div className="form-group">
                                    <label>Job ID</label>
                                    <input 
                                        className="styled-input"
                                        value={job.jobId}
                                        onChange={e => setJob({ ...job, jobId: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Company Name</label>
                                    <input 
                                        className="styled-input"
                                        value={job.Name}
                                        onChange={e => setJob({ ...job, Name: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Applied Date</label>
                                    <input 
                                        className="styled-input"
                                        type="date"
                                        value={job.AppliedDate}
                                        onChange={e => setJob({ ...job, AppliedDate: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Status</label>
                                    <select
                                        className="styled-input"
                                        value={job.Status}
                                        onChange={e => setJob({ ...job, Status: e.target.value })}
                                    >
                                        <option value="applied">Applied</option>
                                        <option value="interview">Interview</option>
                                        <option value="offer">Offer</option>
                                        <option value="rejected">Rejected</option>
                                        <option value="waitlist">Waitlist</option>
                                    </select>
                                </div>
                                <div className="form-group checkbox-group">
                                    <label>
                                        <input 
                                            type="checkbox"
                                            checked={job.Referall}
                                            onChange={e => setJob({ ...job, Referall: e.target.checked })}
                                        />
                                        <span>Referral Available</span>
                                    </label>
                                </div>
                            </div>

                            <div className="button-group">
                                <button className="save-button" onClick={handleUpdate}>
                                    <FontAwesomeIcon icon={faCheckCircle} /> Save Changes
                                </button>
                                <button className="cancel-button" onClick={toggleEditMode}>
                                    <FontAwesomeIcon icon={faTimesCircle} /> Cancel
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="details-content">
                            <div className="company-header">
                                <div className="company-logo-container">
                                    <img src="/company.png" alt={job.Name} className="company-logo" />
                                </div>
                                <h2>{job.Name}</h2>
                            </div>
                            
                            <div className={getStatusClass(job.Status)}>
                                {job.Status.toUpperCase()}
                            </div>

                            <div className="details-grid">
                                <div className="info-card">
                                    <FontAwesomeIcon icon={faCalendarAlt} />
                                    <div className="info-content">
                                        <h3>Applied Date</h3>
                                        <p>{new Date(job.AppliedDate).toLocaleDateString()}</p>
                                    </div>
                                </div>
                                <div className="info-card">
                                    <FontAwesomeIcon icon={faBriefcase} />
                                    <div className="info-content">
                                        <h3>Referral Status</h3>
                                        <p>{job.Referall ? "Referred" : "Not Referred"}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="action-buttons">
                                <button className="edit-button" onClick={toggleEditMode}>
                                    <FontAwesomeIcon icon={faPencilAlt} /> Edit Application
                                </button>
                                <button className="delete-button" onClick={handleDelete}>
                                    <FontAwesomeIcon icon={faTrashAlt} /> Delete Application
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                <div className="notes-section">
                    <div className="notes-header">
                        <FontAwesomeIcon icon={faStickyNote} className="notes-icon" />
                        <h2>Application Notes</h2>
                    </div>
                    
                    <div className="add-note">
                        <input
                            type="text"
                            className="note-input"
                            placeholder="Add a note..."
                            value={newNote}
                            onChange={(e) => setNewNote(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && addNote()}
                        />
                        <button className="add-note-btn" onClick={addNote}>
                            <FontAwesomeIcon icon={faPlus} />
                        </button>
                    </div>

                    <div className="notes-list">
                        {notes.map(note => (
                            <div key={note.id} className="note-card">
                                <div className="note-content">
                                    <p>{note.text}</p>
                                    <span className="note-date">{note.date}</span>
                                </div>
                                <button 
                                    className="delete-note-btn"
                                    onClick={() => deleteNote(note.id)}
                                >
                                    <FontAwesomeIcon icon={faTimesCircle} />
                                </button>
                            </div>
                        ))}
                        {notes.length === 0 && (
                            <div className="empty-notes">
                                <p>No notes yet. Add your first note!</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobDetails;
