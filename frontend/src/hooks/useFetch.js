import { useEffect, useState } from "react";
import axios from "axios";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [outOfStockCount, setOutOfStockCount] = useState(0);
  const [totalStoreValue, setTotalStoreValue] = useState(0); // Added totalStoreValue state

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(url);
        setData(res.data);
        calculateTotalPrice(res.data);
        setProductCount(res.data.length);
        setOutOfStockCount(
          res.data.filter((item) => item.productQuantity === 0).length
        );
        calculateTotalStoreValue(res.data); // Calculate total store value
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };
    fetchData();
  }, [url]);

  const calculateTotalPrice = (data) => {
    let totalPrice = 0;
    data.forEach((product) => {
      totalPrice += product.productPrice * product.productQuantity;
    });
    setTotalPrice(totalPrice);
  };

  const calculateTotalStoreValue = (data) => {
    let totalStoreValue = 0;
    data.forEach((product) => {
      totalStoreValue += product.productPrice * product.productQuantity;
    });
    setTotalStoreValue(totalStoreValue);
  };

  const reFetch = async () => {
    setLoading(true);
    try {
      const res = await axios.get(url);
      setData(res.data);
      calculateTotalPrice(res.data);
      setProductCount(res.data.length);
      setOutOfStockCount(
        res.data.filter((item) => item.productQuantity === 0).length
      );
      calculateTotalStoreValue(res.data); // Update total store value on re-fetch
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  return {
    data,
    loading,
    error,
    reFetch,
    totalPrice,
    productCount,
    outOfStockCount,
    totalStoreValue,
  };
};

export default useFetch;

