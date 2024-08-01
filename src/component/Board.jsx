import { memo, useEffect, useState } from 'react';
import { useAuth } from '../context/AuthProvider';
import parseDate from '../util/date';
import Pagination from 'react-js-pagination';
import Button from 'react-bootstrap/Button';
import { Modal } from 'react-bootstrap';
import WritePostModal from './WritePostModal';
import ViewPostModal from './ViewpostModal';
import EditPostModal from './EditPostModal';
import './BoardStyle.css';

const Board = memo(({ postService, userId }) => {
  const [posts, setPosts] = useState([]);
  const [likes, setLikes] = useState({});
  const [page, setPage] = useState(1);
  const [displayedPosts, setDisplayedPosts] = useState([]);
  const itemsPerPage = 8;
  const [showWriteModal, setShowWriteModal] = useState(false);
  const [postIdForView, setPostIdForView] = useState(null);
  const [postIdForEdit, setPostIdForEdit] = useState(null);

  const handleCloseViewModal = () => setPostIdForView(null);
  const handleCloseEditModal = () => setPostIdForEdit(null);
  const handleOpenWriteModal = () => setShowWriteModal(true);
  const handleCloseWriteModal = () => setShowWriteModal(false);

  const handleOpenViewModal = (postId) => {
    setPostIdForView(postId);
    setPostIdForEdit(null);
  };

  const handleOpenEditModal = (postId) => {
    setPostIdForEdit(postId);
    setPostIdForView(null);
  };

  const paging = (pageNumber) => {
    setPage(pageNumber);
  };

  const { user } = useAuth();

  useEffect(() => {
    postService
      .getPosts(userId)
      .then((posts) => {
        setPosts([...posts]);
        posts.forEach((post) => {
          postService
            .getPostLike(post.id)
            .then((likeCount) => {
              setLikes((prevLikes) => ({
                ...prevLikes,
                [post.id]: likeCount,
              }));
            })
            .catch(() => console.log('좋아요 받아오기 실패'));
        });
      })
      .catch(() => console.log('getPosts Error'));
  }, [postService, user, userId]);

  useEffect(() => {
    if (Array.isArray(posts)) {
      setDisplayedPosts(posts.slice((page - 1) * itemsPerPage, page * itemsPerPage));
    } else {
      setDisplayedPosts([]);
    }
  }, [posts, page]);

  useEffect(() => {
    if (!showWriteModal && !postIdForEdit) {
      postService
        .getPosts(userId)
        .then((posts) => {
          setPosts([...posts]);
          setDisplayedPosts(posts.slice((page - 1) * itemsPerPage, page * itemsPerPage));
        })
        .catch(() => console.log('getPosts Error'));
    }
  }, [showWriteModal, postIdForEdit, postService, userId, page]);

  const handlePostSaved = () => {
    postService
      .getPosts(userId)
      .then((posts) => {
        setPosts([...posts]);
        setDisplayedPosts(posts.slice((page - 1) * itemsPerPage, page * itemsPerPage));
      })
      .catch(() => console.log('getPosts Error'));
  };

  const tagMapping = {
    1: '광고',
    2: '부정',
    3: '소비',
    4: '저축',
    5: '수입',
    6: '기타',
  };

  const getTagText = (tagNumber) => {
    return tagMapping[tagNumber] || '알 수 없음';
  };

  const handlePostDeleted = (postId) => {
    setPosts(posts.filter((post) => post.id !== postId));
    setDisplayedPosts(posts.filter((post) => post.id !== postId).slice((page - 1) * itemsPerPage, page * itemsPerPage));
  };

  return (
    <div className='board-container'>
      <p className='title'>커뮤니티</p>
      <div className='board-header'>
        <p className='no'>No</p>
        <p className='category'>카테고리</p>
        <p className='post-title'>제목</p>
        <p className='nick'>글쓴이</p>
        <p className='time'>작성시간</p>
        <p className='like'>좋아요</p>
      </div>
      <ul className='board-list'>
        {displayedPosts && displayedPosts.length > 0 ? (
          displayedPosts.map((post, index) => (
            <li className='board-item' key={post.id} onClick={() => handleOpenViewModal(post.id)}>
              <p className='no'>{(page - 1) * itemsPerPage + index + 1}</p>
              <p className='category'>{getTagText(post.tag)}</p>
              <p className='post-title'>{post.title}</p>
              <p className='nick'>{post.nickname}</p>
              <p className='time'>{parseDate(post.createdAt)}</p>
              <p className='like'>{likes[post.id] || 0}</p>
            </li>
          ))
        ) : (
          <li>게시글이 없습니다</li>
        )}
      </ul>
      <div className='bottomSection'>
        <Button className='writeButton' onClick={handleOpenWriteModal}>
          글쓰기
        </Button>
      </div>

      <div className='paginationContainer'>
        <Pagination
          activePage={page}
          itemsCountPerPage={itemsPerPage}
          totalItemsCount={posts.length}
          pageRangeDisplayed={5}
          prevPageText={'‹'}
          nextPageText={'›'}
          onChange={paging}
          innerClass='pagination'
          itemClass='page-item'
          linkClass='page-link'
          activeClass='active'
          activeLinkClass='active-link'
        />
      </div>
      <Modal show={showWriteModal} onHide={handleCloseWriteModal} size='lg' className='custom-modal'>
        <Modal.Header closeButton>
          <Modal.Title className='postBtn'>글쓰기</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <WritePostModal
            handleCloseModal={handleCloseWriteModal}
            postService={postService}
            userId={user.id}
            onPostSaved={handlePostSaved}
          />
        </Modal.Body>
      </Modal>
      {postIdForView !== null && (
        <Modal show={postIdForView !== null} onHide={handleCloseViewModal} size='lg' className='custom-modal'>
          <Modal.Header closeButton>
            <Modal.Title>게시글</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ViewPostModal
              postId={postIdForView}
              handleCloseModal={handleCloseViewModal}
              postService={postService}
              handleOpenEditModal={handleOpenEditModal}
              onPostSaved={handlePostSaved}
              handlePostDeleted={handlePostDeleted}
            />
          </Modal.Body>
        </Modal>
      )}
      {postIdForEdit !== null && (
        <Modal show={postIdForEdit !== null} onHide={handleCloseEditModal} size='lg' className='custom-modal'>
          <Modal.Header closeButton>
            <Modal.Title>게시글 수정</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <EditPostModal
              postId={postIdForEdit}
              handleCloseModal={handleCloseEditModal}
              postService={postService}
              onPostSaved={handlePostSaved}
            />
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
});

export default Board;
