''' Use Python 3.9.2 '''

from selenium import webdriver
from selenium.webdriver.common import by
from selenium.webdriver.common.by import By
from selenium.webdriver import chrome
from selenium.webdriver.chrome import service
from selenium.webdriver.chrome.service import Service

import firebase_admin
from firebase_admin import db
from firebase_admin import credentials

from typing import Dict, List
import requests
import time

class GetWorldData():
    def __init__(self) -> None:
        ''' Crawler '''
        # https://www.worldometers.info/coronavirus/
        self.path = "crawler/chrome_driver/chromedriver"
        self.targetPath = 'https://www.worldometers.info/coronavirus/'
        
        self.driver = webdriver.Chrome(self.path)

    def Crawler(self):
        self.driver.get(self.targetPath)
    
        state = self.driver.find_element(By.XPATH, '//*[@id="main_table_countries_today"]/tbody[1]')
        stateData = state.find_elements(By.CLASS_NAME, 'total_row_world')

        return stateData

    def SortData(self, stateData, currentTime):
        stateDic = {'World_Data':{}}

        for i in stateData:
            try:
                self.driver.execute_script("arguments[0].style.display = '';", i) # display data, so the crawler can get it
            except:
                pass

            stateList = self.SplitData(i.text)
            
            if stateList:
                name = stateList[0]
                data = stateList[1]

                stateDic['World_Data'][name] = data
            else:
                continue
        
        stateDic['World_Data']['time'] = currentTime

        return stateDic

    def SplitData(self, data):
        states = ['World', 'Asia', 'Europe', 'North', 'South', 'Africa', 'Oceania']
        stateData = []

        dataList = data.split()
        name = dataList[0]

        if name not in states:
            return False

        if name == 'North' or name == 'South':
            name = f'{name}_America'
            stateData.append(name)
            stateData.append(dataList[2:8])
        else:
            stateData.append(name)
            stateData.append(dataList[1:7])

        return stateData

    def PushToFirebase(self, data):
        ''' Store data to firebase '''
        ref = db.reference("/World_Data")
        ref.set(data['World_Data'])

class TwData():
    def __init__(self) -> None:
        ''' Crawler '''
        # https://nidss.cdc.gov.tw/nndss/DiseaseMap?id=19CoV
        self.path = "crawler/chrome_driver/chromedriver"
        self.targetPath = 'https://nidss.cdc.gov.tw/nndss/DiseaseMap?id=19CoV'
        
        self.driver = webdriver.Chrome(self.path)

    def Crawler(self):
        self.driver.get(self.targetPath)

        table = self.driver.find_element(By.ID, 'example1')
        chart = table.find_elements(By.XPATH,'//*[@id="example1"]/tbody')

        return chart

    def SortData(self, chart, currentTime):
        cases = {'TW_data':{}}

        for i in chart:
            dataList = i.text.split('\n')

        for i in dataList:
            city, amount = i.split(' ')
            city = self.CheckCityName(city)

            cases['TW_data'][city] = amount

        # locTime = time.localtime()
        # cases['TW_data']["time"] = f'{locTime[0]}-{locTime[1]}-{locTime[2]}-{locTime[3]}:{locTime[4]}:{locTime[5]}'
        cases['TW_data']["time"] = currentTime
        print(cases['TW_data'])

        return cases

    def CheckCityName(self, cityName):
        if '台' in cityName:
            cityName = cityName.replace('台', '臺')
        return cityName

    def PushToFirebase(self, data):
        ''' Store data to firebase '''
        ref = db.reference("/TW_data")
        ref.set(data['TW_data'])

class NewsCrawler():
    def __init__(self) -> None:
        ''' Crawler '''
        # https://www.cdc.gov.tw/Bulletin/List/MmgtpeidAR5Ooai4-fgHzQ
        self.path = "crawler/chrome_driver/chromedriver"
        self.targetPath = "https://www.cdc.gov.tw/Bulletin/List/MmgtpeidAR5Ooai4-fgHzQ"
        
        self.driver = webdriver.Chrome(self.path)

    def Crawler(self):
        self.driver.get(self.targetPath)
        table = self.driver.find_element(By.CLASS_NAME, 'cbp-l-grid-agency')
        chart = table.find_elements(By.CLASS_NAME, 'content-boxes-v3')

        # self.sortData(chart)
        return chart

    def sortData(self, chart, currentTime):
        news = {'News':{}}
        for i in chart:
            link = i.find_element(By.TAG_NAME, 'a').get_attribute('href')
            i = i.text
            month, day, data = i.split('\n')
            data = f'{data}_{link}'

            year, month = month.split(' - ')
            date = f'{year}-{month}-{day}'

            dataList = []
            dataList.append(data)

            if date in news['News'].keys():
                news['News'][date].append(data)
            else:
                news['News'][date] = dataList

        # locTime = time.localtime()
        # news['News']["time"] = f'{locTime[0]}-{locTime[1]}-{locTime[2]}-{locTime[3]}:{locTime[4]}:{locTime[5]}'
        news['News']["time"] = currentTime
        # print(news)
        sorted(news['News'].keys(), reverse=True)
        return news

    def PushToFirebase(self, data):
        ref = db.reference("/News")
        ref.set(data['News'])

class GetVaccineData():
    def __init__(self) -> None:
        self.url = 'https://covid-19.nchc.org.tw/api/covid19?CK=covid-19@nchc.org.tw&querydata=2006'

    def RequestGetData(self) -> Dict:
        data = requests.get(self.url)
        dataDic = data.json()

        return dataDic

    def SortData(self, dataDic: Dict) -> Dict:
        vaccineDic = {'vaccine': {}}

        latest = dataDic[-1]['a01']
        for i in dataDic:
            time = i['a01']
            if not latest: # get latest data
                latest = time

            if time == latest:
                city = i['a02']
                if city not in vaccineDic['vaccine'].keys(): # if city data exsist 
                    vaccineDic['vaccine'][city] = {}
                data = [float(i['a04']), float(i['a05']), float(i['a06'])]
                vaccineDic['vaccine'][city][i['a03']] = data
        vaccineDic['vaccine']['time'] = latest

        return vaccineDic

    def PushToFirebase(self, data):
        ref = db.reference("/Vaccine")
        ref.set(data['vaccine'])

class GetVaccineTypeData():
    def __init__(self) -> None:
        # 'https://covid-19.nchc.org.tw/api/covid19?CK=covid-19@nchc.org.tw&querydata=2004'
        self.url = 'https://covid-19.nchc.org.tw/api/covid19?CK=covid-19@nchc.org.tw&querydata=2004'

    def RequestData(self) -> Dict:
        data = requests.get(self.url)
        dataDic = data.json()

        return dataDic
    
    def OrganizeData(self, dataDic: Dict) -> Dict:
        vaccineTypeData = {'vaccineType': {}}

        allData = []
        latest = dataDic[-1]['a02']
        for i in dataDic:
            time =i['a02']
            if time == latest:
                type = self.CheckType(i['a03'])
                data = [float(i['a04']), float(i['a05']), float(i['a06'])]
                vaccineTypeData['vaccineType'][type] = data
        vaccineTypeData['vaccineType']['time'] = latest

        return vaccineTypeData

    def CheckType(self, name: str) -> str:
        if 'AstraZeneca' in name:
            name = 'AstraZeneca'

        return name

    def PushToFirebase(self, data):
        ref = db.reference("/Vaccine_type")
        ref.set(data['vaccineType'])

def GetCurrentTime():
    locTime = time.localtime()
    currentTime = f'{locTime[0]}-{locTime[1]}-{locTime[2]}-{locTime[3]}:{locTime[4]}:{locTime[5]}'

    return currentTime

if __name__ == "__main__":
    ''' initialize firebase '''
    cred = credentials.Certificate('/Users/kk98033/Desktop/code_stuff/crawler/TW_data/key.json')
    firebase_admin.initialize_app(cred, {'databaseURL': 'https://covid-19-website-b68f9-default-rtdb.asia-southeast1.firebasedatabase.app/'})

    ''' get current time '''
    currentTime = GetCurrentTime()

    twCrawler = TwData()
    twData = twCrawler.Crawler()
    twData = twCrawler.SortData(twData, currentTime)
    print(twData)
    twCrawler.PushToFirebase(twData)

    newsCrawler = NewsCrawler()
    news = newsCrawler.Crawler()
    news = newsCrawler.sortData(news, currentTime)
    print(news)
    newsCrawler.PushToFirebase(news)

    worldCrawler = GetWorldData()
    stateData = worldCrawler.Crawler()
    stateData = worldCrawler.SortData(stateData, currentTime)
    print(stateData)
    worldCrawler.PushToFirebase(stateData)

    getVaccineData = GetVaccineData()
    dataDic = getVaccineData.RequestGetData()
    vaccinedic = getVaccineData.SortData(dataDic)
    print(vaccinedic)
    getVaccineData.PushToFirebase(vaccinedic)

    getVaccineType = GetVaccineTypeData()
    vaccienTypeData = getVaccineType.RequestData()
    vacTypeDic = getVaccineType.OrganizeData(vaccienTypeData)
    print(vacTypeDic)
    getVaccineType.PushToFirebase(vacTypeDic)