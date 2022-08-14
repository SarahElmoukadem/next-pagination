import axios from 'axios';
import { useEffect, useState } from 'react';
import Pagination from '../components/Pagination';
import { paginate } from '../utils/paginate';

const Home = () => {

  const [posts, setPosts] = useState([]);
  const [currentPage,setCurrentPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    const getPosts = async () => {
      const { data: res } = await axios.get('https://jsonplaceholder.typicode.com/posts');
      setPosts(res)
    }
    getPosts()
  }, []);

  const handlePageChange = page => {
    setCurrentPage(page)
  }

  const paginatePosts = paginate(posts, currentPage, pageSize)

  return (<div className='container'>
    <table className='table'>
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Delete</th>
        </tr>
      </thead>

      <tbody>
        {paginatePosts.map((post) =>
          <tr key={post.id}>
            <td>{post.id}</td>
            <td>{post.title}</td>
            <td>
              <button className='btn btn-danger'>
                Delete
              </button>
            </td>
          </tr>
        )}
      </tbody>
    </table>
    <Pagination items={posts.length}
     currentPage={currentPage}
      pageSize={pageSize}
       onPageChange={handlePageChange}/>
  </div>);
}

export default Home;