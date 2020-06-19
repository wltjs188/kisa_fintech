# -*- coding: utf-8 -*-
from selenium import webdriver
from selenium.webdriver.support.ui import Select
driver = webdriver.Chrome('./chromedriver')
driver.get('http://luris.molit.go.kr/web/index.jsp');

#//*[@id="gnb_tab11"]/div/div[2]/div/div[1]/ul/li[1]/select
#//*[@id="gnb_tab11"]/div/div[2]/div/div[1]/ul/li[2]
#.....

element = Select(driver.find_element_by_xpath('//*[@id="gnb_tab11"]/div/div[2]/div/div[1]/ul/li[1]/select'))
element2 = Select(driver.find_element_by_xpath('//*[@id="gnb_tab11"]/div/div[2]/div/div[1]/ul/li[2]/select'))
element3 = Select(driver.find_element_by_xpath('//*[@id="gnb_tab11"]/div/div[2]/div/div[1]/ul/li[3]/select'))
element4 = Select(driver.find_element_by_xpath('//*[@id="gnb_tab11"]/div/div[2]/div/div[1]/ul/li[4]/select'))
element5 = driver.find_element_by_xpath('//*[@id="gnb_tab11"]/div/div[2]/div/div[2]/ul/li[2]/input')
element6 = driver.find_element_by_xpath('//*[@id="gnb_tab11"]/div/div[2]/div/div[2]/ul/li[4]/input')
button = driver.find_element_by_xpath('//*[@id="gnb_tab11"]/div/div[2]/div/div[3]/button')

element.select_by_visible_text("전라남도")
driver.implicitly_wait(1)
element2.select_by_visible_text("고흥군")
driver.implicitly_wait(1)
element3.select_by_visible_text("고흥읍")
driver.implicitly_wait(1)
element4.select_by_visible_text("남계리")
driver.implicitly_wait(1)
element5.send_keys("45")
element6.send_keys("1")
button.click();

print (driver.find_element_by_xpath('//*[@id="printData1"]/td[2]').text)