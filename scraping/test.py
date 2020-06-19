# -*- coding: utf-8 -*-
from selenium import webdriver
driver = webdriver.Chrome('./chromedriver')
#driver.implicitly_wait(3)
driver.get('https://news.naver.com/main/read.nhn?mode=LSD&mid=shm&sid1=103&oid=584&aid=0000009226')

# title = driver.find_element_by_id('articleTitle')
title = driver.find_element_by_xpath('//*[@id="articleTitle"]')
print(title)