import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);
  const [disabled, setDisabled] = useState(false);

  function loadMore() {
    setCount((prevCount) => prevCount + 1);
  }

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://dummyjson.com/products?limit=20&skip=${
          count === 0 ? 0 : count + 20
        }`
      );

      const result = await response.json();

      if (result && result.products && result.products.length) {
        setProducts((prevData) => [...prevData, ...result.products]);
        setLoading(false);
      }

      console.log(result);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [count]);

  useEffect(() => {
    if (products && products.length === 194) {
      setDisabled(true);
    }
  }, [count]);

  if (loading) {
    return (
      <div className='loading'>
        <p>Loading. Please Wait</p>
      </div>
    );
  }

  return (
    <div className='container'>
      <div className='products-container'>
        {products && products.length
          ? products.map((item, index) => {
              return (
                <div
                  key={index}
                  className='product'
                >
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                  />
                  <p>{item.title}</p>
                  <p>{item.description}</p>
                </div>
              );
            })
          : null}
      </div>
      <div className='btn-container'>
        <button
          className='btn'
          onClick={() => loadMore()}
          disabled={disabled}
        >
          Load more
        </button>
        {disabled ? <p>All products displayed</p> : null}
      </div>
    </div>
  );
}

export default App;
