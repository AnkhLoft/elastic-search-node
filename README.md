# Elastic search integration with nodejs

## Requirements
* Docker installed
* Nodejs installed

## Run elastic search docker image
```
$ sudo docker run -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" docker.elastic.co/elasticsearch/elasticsearch:6.4.0
```

## Download and extract the below database (this should take a while, have a cup of coffee)
```
$ wget https://github.com/geometalab/OSMNames/releases/download/v2.0/planet-latest_geonames.tsv.gz && gunzip planet-latest_geonames.tsv.gz 
```