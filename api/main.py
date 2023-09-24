from flask import Flask, jsonify
from bs4 import BeautifulSoup
import requests
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


def scrape(url):
    # Set the User-Agent header to mimic a web browser request
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
        "Referer": "https://www.imdb.com/"
    }

    # Send a GET request with headers
    response = requests.get(url, headers=headers).text
    soup = BeautifulSoup(response, 'lxml')
    # creating an empty list, so that we can append the values
    movie_name = []
    year = []
    rating = []
    description = []
    director = []
    stars = []

    # storing the meaningful required data in the variable
    movie_data = soup.findAll('div', attrs={'class': 'lister-item mode-advanced'})

    # calling one by one using for loop
    for store in movie_data:
        name = store.h3.a.text
        movie_name.append(name)

        year_of_release = store.h3.find('span', class_='lister-item-year text-muted unbold').text.replace('(',
                                                                                                          '').replace(
            ')', '')
        year.append(year_of_release)

        if store.find('div', class_='inline-block ratings-imdb-rating'):
            rate = store.find('div', class_='inline-block ratings-imdb-rating').text.replace('\n', '')
            rating.append(rate)
        else:
            rating.append('NA')

        describe = store.find_all('p', class_='text-muted')
        description_ = describe[1].text.replace('\n', '') if len(describe) > 1 else '*****'
        description.append(description_)

        cast = store.find("p", class_='')
        cast = cast.text.replace('\n', '').split('|')
        cast = [x.strip() for x in cast]
        cast = [cast[i].replace(j, "") for i, j in enumerate(["Director:", "Stars:"])]
        director.append(cast[0])
        stars.append([x.strip() for x in cast[1].split(",")])

    # creating a dataframe using pandas library
    movie_dic = {'name_of_movie': movie_name, 'release_year': year, 'movie_rating': rating,
                 'Description': description, "Director": director, 'Star': stars}

    return movie_dic


@app.route("/Action")
def return_data_action():
    data = scrape("https://www.imdb.com/search/title/?genres=Action&explore=genres&title_type=movie")
    return jsonify(data)


@app.route("/Adventure")
def return_data_adventure():
    data = scrape("https://www.imdb.com/search/title/?genres=Adventure&explore=genres&title_type=movie")
    return jsonify(data)


@app.route("/Animation")
def return_data_animation():
    data = scrape("https://www.imdb.com/search/title/?genres=Animation&explore=genres&title_type=movie")
    return jsonify(data)


@app.route("/Comedy")
def return_data_comedy():
    data = scrape("https://www.imdb.com/search/title/?genres=Comedy&explore=genres&title_type=movie")
    return jsonify(data)


@app.route("/Crime")
def return_data_crime():
    data = scrape("https://www.imdb.com/search/title/?genres=Crime&explore=genres&title_type=movie")
    return jsonify(data)


@app.route("/Drama")
def return_data_drama():
    data = scrape("https://www.imdb.com/search/title/?genres=Drama&explore=genres&title_type=movie")
    return jsonify(data)


@app.route("/Horror")
def return_data_horror():
    data = scrape("https://www.imdb.com/search/title/?genres=Horror&explore=genres&title_type=movie")
    return jsonify(data)


@app.route("/Romance")
def return_data_romance():
    data = scrape("https://www.imdb.com/search/title/?genres=Romance&explore=genres&title_type=movie")
    return jsonify(data)


@app.route("/Space")
def return_data_space():
    data = scrape("https://www.imdb.com/search/title/?genres=Space&explore=genres&title_type=movie")
    return jsonify(data)


@app.route("/Sci-Fi")
def return_data_scifi():
    data = scrape("https://www.imdb.com/search/title/?genres=Sci-Fi&explore=genres&title_type=movie")
    return jsonify(data)


@app.route("/Thriller")
def return_data_thriller():
    data = scrape("https://www.imdb.com/search/title/?genres=Thriller&explore=genres&title_type=movie")
    return jsonify(data)


@app.route("/War")
def return_data_war():
    data = scrape("https://www.imdb.com/search/title/?genres=War&explore=genres&title_type=movie")
    return jsonify(data)


# if __name__ == "__main__":
#     app.run(host='0.0.0.0', port=5000)
