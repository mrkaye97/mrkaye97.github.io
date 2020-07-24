rm(list = ls())

library(tidyverse)
library(ggmap)
library(maptools)
library(maps)
library(tmap)
library(spData)
library(viridis)
library(ggthemes)
library(plotly)

world <- read.csv("~/Google Drive/GitHub/mrkaye97.github.io/map/world.csv") %>%
  bind_rows(data.frame(iso_a2='FG', name_long='French Guiana'))


countries <- read.csv("~/Google Drive/GitHub/mrkaye97.github.io/map/countries.csv") %>%
  rename('iso_a2' = 1,
         'Status' = 3) %>%
  right_join(world, by = 'iso_a2') %>%
  select(2,3,4) %>%
  left_join(spData::world, by='name_long') %>%
  mutate(name_long=recode(name_long,
                          'Russian Federation' = 'Russia',
                          'United States' = 'USA',
                          'United Kingdom' = 'UK',
                          'Lao PDR' = 'Laos',
                          'Republic of Korea' = 'South Korea',
                          'Dem. Rep. Korea' = 'North Korea',
                          "Côte d'Ivoire" = 'Ivory Coast',
                          'Republic of the Congo' = 'Republic of Congo'),
         Status = replace_na(Status, 'Not Visited'),
         Status = factor(Status, levels = c("Haven\'t Been", "Been", "Favorite", "Next Stop")))

map.world <- map_data("world") %>%
  rename('name_long'=5) %>%
  left_join(countries, by='name_long')

plt <- map.world %>%
  select(lat, long, group, Status, Long, pop) %>%
  drop_na(Status) %>%
  ggplot()+
    geom_polygon(aes(x = long, 
                     y = lat, 
                     group = group, 
                     fill=Status,
                     text=paste('Country: ', Long)), 
                 size=.1,
                 color='white')+
    scale_fill_manual(values = alpha(c("black", 'firebrick4', 'dodgerblue', 'goldenrod'), .8))+
  theme_fivethirtyeight()+
  theme(panel.grid.major = element_blank(),
        axis.text = element_blank(),
        legend.title = element_blank(),
        legend.spacing.x = unit(.15, 'cm'))


ggsave('plt.svg', plt, 'svg', dpi = 'retina', path = '~/Google Drive/GitHub/mrkaye97.github.io/', width = 6, height = 4.8)
