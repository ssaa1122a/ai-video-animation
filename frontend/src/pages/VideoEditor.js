import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import TemplateSelector from '../components/TemplateSelector';
import Timeline from '../components/Timeline';
import PreviewPanel from '../components/PreviewPanel';
import ElementProperties from '../components/ElementProperties';

const VideoEditor = () => {
  const { id } = useParams();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [video, setVideo] = useState(null);
  const [selectedElement, setSelectedElement] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const previewRef = useRef();

  useEffect(() => {
    const loadVideo = async () => {
      try {
        if (id) {
          const res = await axios.get(`/api/videos/${id}`);
          setVideo(res.data);
        } else {
          setVideo({
            title: 'New Video',
            elements: [],
            status: 'editing'
          });
        }
      } catch (err) {
        console.error('Failed to load video', err);
      }
    };
    loadVideo();
  }, [id]);

  const handleSave = async () => {
    try {
      if (id) {
        await axios.put(`/api/videos/${id}`, video);
      } else {
        const res = await axios.post('/api/videos', video);
        navigate(`/editor/${res.data._id}`);
      }
    } catch (err) {
      console.error('Failed to save video', err);
    }
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const res = await axios.post(`/api/videos/${id}/generate`);
      setVideo({ ...video, outputUrl: res.data.outputUrl, status: 'completed' });
    } catch (err) {
      console.error('Failed to generate video', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const addElement = (type) => {
    const newElement = {
      type,
      content: type === 'text' ? 'New Text' : '',
      position: { x: 50, y: 50 },
      duration: 5,
      style: {}
    };
    setVideo({
      ...video,
      elements: [...video.elements, newElement]
    });
    setSelectedElement(newElement);
  };

  return (
    <div className="editor-container">
      <div className="toolbar">
        <button onClick={() => addElement('text')}>Add Text</button>
        <button onClick={() => addElement('image')}>Add Image</button>
        <button onClick={handleSave}>Save</button>
        {id && <button onClick={handleGenerate} disabled={isGenerating}>
          {isGenerating ? 'Generating...' : 'Generate Video'}
        </button>}
      </div>

      <div className="editor-content">
        <TemplateSelector />
        <PreviewPanel 
          video={video} 
          selectedElement={selectedElement}
          ref={previewRef}
        />
        <ElementProperties 
          element={selectedElement} 
          onChange={(updated) => {
            const updatedElements = video.elements.map(el => 
              el === selectedElement ? updated : el
            );
            setVideo({ ...video, elements: updatedElements });
            setSelectedElement(updated);
          }}
        />
        <Timeline 
          elements={video?.elements || []} 
          onSelect={setSelectedElement}
        />
      </div>
    </div>
  );
};

export default VideoEditor;