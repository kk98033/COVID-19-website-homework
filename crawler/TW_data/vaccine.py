from typing import Dict
import requests

import firebase_admin
from firebase_admin import db
from firebase_admin import credentials


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
                data = [i['a04'], i['a05'], i['a06']]
                vaccineDic['vaccine'][city][i['a03']] = data

        return vaccineDic

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
                type = i['a03']
                # allData.append(i['a07'])
                data = [i['a04'], i['a05'], i['a06']]
                vaccineTypeData['vaccineType'][type] = data

        return vaccineTypeData

    # def GetPercentage(self, total, data):
    #     percentagte = []
    #     for i in data


getVaccineData = GetVaccineData()
dataDic = getVaccineData.RequestGetData()
vaccinedic = getVaccineData.SortData(dataDic)
print(vaccinedic)

getVaccineType = GetVaccineTypeData()
vaccienTypeData = getVaccineType.RequestData()
vacTypeDic = getVaccineType.OrganizeData(vaccienTypeData)
print(vacTypeDic)