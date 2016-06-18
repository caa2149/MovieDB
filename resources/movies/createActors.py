import urllib2
import ast
import csv
from time import *

def read_file(filename):
    list = open(filename).readlines()
    list = list[0].split('\r')
    return list

def convert_to_url(ID):
    ID = ("http://www.omdbapi.com/?i=" + ID + "&plot=short&r=json")
    return ID
    
def http_request(URL):
    URL = urllib2.urlopen(URL).read()
    return URL
    
def string_to_dict(string):
    string = ast.literal_eval(string)
    return string

def to_txt(full):
    with open('actors.txt', 'wb') as f:
        f.write(full)
    return 0

def fix_values(broken):
    for i in broken:
        broken[i] = broken[i].replace("\"","&apos;")
        broken[i] = broken[i].replace("'","&apos;")
    return broken

def toString(almost):
    almost = str(almost)
    
    almost = almost.replace("'","\"")
    
    almost = almost.replace("&apos;","\\'")

    return almost


def main():
    
    start = time()
    ids = read_file('imdbIDs.txt')

    for i in range(0,len(ids)):
        ids[i] = convert_to_url(ids[i])
        ids[i] = http_request(ids[i])
        ids[i] = string_to_dict(ids[i])
        ids[i].pop("Genre", None)
        ids[i].pop("Year", None)
        ids[i].pop("Metascore", None)
        ids[i].pop("imdbRating", None)
        ids[i].pop("Plot", None)
        ids[i].pop("Poster", None)
        ids[i].pop("Runtime", None)
        ids[i].pop("Rating", None)
        ids[i].pop("Type", None)
        ids[i].pop("Awards", None)
        ids[i].pop("Response", None)
        ids[i].pop("Language", None)
        ids[i].pop("Country", None)
        ids[i].pop("Rated", None)
        ids[i].pop("Writer", None)
        ids[i].pop("Director", None)
        ids[i].pop("Released", None)
        ids[i].pop("Title", None)
        ids[i].pop("imdbVotes", None)
        ids[i] = fix_values(ids[i])
        print (str(i+1) + ': "' + ids[i]['imdbID'] + '" found!')

    ids = toString(ids)

    to_txt("var allMovies = " + ids)
    
    print (time()-start)



main()