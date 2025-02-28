import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
import avatar1 from '../avatars/avatar1.png';
import avatar2 from '../avatars/avatar2.png';
import avatar3 from '../avatars/avatar3.png';
import avatar4 from '../avatars/avatar4.png';
import avatar5 from '../avatars/avatar5.png';
import avatar6 from '../avatars/avatar6.png';
import avatar7 from '../avatars/avatar7.png';
import avatar8 from '../avatars/avatar8.png';
import avatar9 from '../avatars/avatar9.png';
import avatar10 from '../avatars/avatar10.png';
import RouteHistory from './RouteHistory'; // Импортируем новый компонент

const avatars = {
  'avatar1.png': avatar1,
  'avatar2.png': avatar2,
  'avatar3.png': avatar3,
  'avatar4.png': avatar4,
  'avatar5.png': avatar5,
  'avatar6.png': avatar6,
  'avatar7.png': avatar7,
  'avatar8.png': avatar8,
  'avatar9.png': avatar9,
  'avatar10.png': avatar10,
};

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showHistory, setShowHistory] = useState(false); // Состояние для отображения истории
  const [selectedRouteId, setSelectedRouteId] = useState(null); // Состояние для выбранного маршрута

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error("Токен отсутствует. Пожалуйста, выполните вход.");
        }

        const response = await fetch('http://localhost:8000/api/user/', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
        });

        if (!response.ok) {
          throw new Error(`Ошибка ${response.status}`);
        }

        const data = await response.json();
        
        // Загрузка сохранённых данных из localStorage
        const savedProfile = localStorage.getItem('userProfile');
        const localData = savedProfile ? JSON.parse(savedProfile) : null;

        setUser({
          ...data,
          username: localData?.username || data.username,
          avatar: localData?.avatar || data.avatar,
        });
        
        setUsername(localData?.username || data.username);
        setSelectedAvatar(localData?.avatar || data.avatar);

      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      // Сохраняем в localStorage
      const profileData = {
        username,
        avatar: selectedAvatar
      };
      
      localStorage.setItem('userProfile', JSON.stringify(profileData));
      
      // Обновляем состояние
      setUser(prev => ({
        ...prev,
        username: username,
        avatar: selectedAvatar
      }));

    } catch (error) {
      setError('Ошибка сохранения данных');
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div className="text-danger">{error}</div>;

  return (
    <div>
      <header>
        <NavBar />
      </header>
      
      <div className="container mt-4">
        <h1>Профиль пользователя</h1>
        
        <div className="profile-info">
          <div className="avatar-section mb-4">
            <img
              src={avatars[selectedAvatar] || avatars['avatar1.png']}
              alt="Аватар"
              className="img-fluid rounded-circle"
              width="150"
              height="150"
            />
            <button 
              className="btn btn-secondary mt-2"
              onClick={() => setIsModalOpen(true)}
            >
              Сменить аватар
            </button>
          </div>

          <form onSubmit={handleSaveProfile}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Имя пользователя</label>
              <input
                type="text"
                className="form-control"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={user.email}
                readOnly
                disabled
              />
            </div>

            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={isSaving}
            >
              {isSaving ? 'Сохранение...' : 'Сохранить изменения'}
            </button>
          </form>
        </div>

        {/* Кнопка для просмотра истории изменений */}
        <button 
          className="btn btn-info mt-4"
          onClick={() => setShowHistory(!showHistory)}
        >
          {showHistory ? 'Скрыть историю изменений' : 'Показать историю изменений'}
        </button>

        {/* Отображение истории изменений */}
        {showHistory && (
          <div className="mt-4">
            <h4>История изменений маршрутов</h4>
            <RouteHistory routeId={selectedRouteId} />
          </div>
        )}

        {/* Модальное окно выбора аватарки */}
        {isModalOpen && (
          <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Выберите аватар</h5>
                  <button 
                    type="button" 
                    className="btn-close" 
                    onClick={() => setIsModalOpen(false)}
                  />
                </div>
                <div className="modal-body d-flex justify-content-around">
                  {Object.entries(avatars).map(([username, src]) => (
                    <img
                      key={username}
                      src={src}
                      alt="Аватар"
                      className={`img-thumbnail cursor-pointer ${selectedAvatar === username ? 'border-primary' : ''}`}
                      style={{ width: '100px', height: '100px' }}
                      onClick={() => {
                        setSelectedAvatar(username);
                        setIsModalOpen(false);
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;