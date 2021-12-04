// Utility Functions

const myCustomFetch = (...args) => {
  let url = args.length > 0 && args[0] !== undefined ? args[0] : "";
  let options = args.length > 1 && args[1] !== undefined ? args[1] : {};

  let xhr = new XMLHttpRequest();
  let onFufillment = [];
  let onError = [];
  let onCompletion = [];
  let method = "GET" || options.method;
  let repeat = null;

  xhr.onreadystatechange = function () {
    let data = this;
    if (this.readyState == 4 && this.status == 200) {
      onFufillment.forEach(function (callback) {
        callback(data);
      });
      onCompletion.forEach(function (callback) {
        callback(data);
      });
      clearInterval(repeat);
    } else if (this.readyState == 4 && this.status !== 200) {
      onError.forEach(function (callback) {
        callback(data);
      });
      onCompletion.forEach(function (callback) {
        callback(data);
      });
    }
  };
  xhr.open(method, url, true);
  xhr.send();

  return {
    then: function then(fufillFunc) {
      onFufillment.push(fufillFunc);
    },
    catch: function _catch(errorFunc) {
      onError.push(errorFunc);
    },
    finally: function _finally(compFunc) {
      onCompletion.push(compFunc);
    },
  };
};

const urlGenerator = (city) =>
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=28824b46851a478eaa59e646200fd6cd`;

const parse = (data) => JSON.parse(data);

// End Utility Functions

const fetchTashkent = myCustomFetch(urlGenerator("Tashkent"));
const fetchSamarkand = myCustomFetch(urlGenerator("Samarkand"));
const fetchBukhara = myCustomFetch(urlGenerator("Bukhara"));
const fetchKhiva = myCustomFetch(urlGenerator("Khiva"));
const fetchUrgench = myCustomFetch(urlGenerator("Urgench"));

Promise.all([
  fetchTashkent,
  fetchSamarkand,
  fetchBukhara,
  fetchKhiva,
  fetchUrgench,
]).then((res) => {
  res.forEach((item) => {
    console.log(parse(item.responseText));
  });
});
