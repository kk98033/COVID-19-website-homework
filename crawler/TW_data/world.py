from selenium import webdriver
from selenium.webdriver.common import by
from selenium.webdriver.common.by import By
from selenium.webdriver import chrome
from selenium.webdriver.chrome import service
from selenium.webdriver.chrome.service import Service

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

    def SortData(self, stateData):
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
        
        return stateDic

    def SplitData(self, data):
        states = ['World', 'Asia', 'Europe', 'North', 'South', 'Africa', 'Oceania']
        stateData = []

        dataList = data.split()
        name = dataList[0]

        print(name)
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

if __name__ == "__main__":
    worldData = GetWorldData()
    stateData = worldData.Crawler()
    stateDic = worldData.SortData(stateData)
    print(stateDic)