# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
course = Course.create({:title => 'Example Course 1'})
Lesson.create({:title => 'Example Lesson 1', :course => course, :body => "Example Body 1"})
Lesson.create({:title => 'Example Lesson 2', :course => course, :body => "Example Body 2"})
Course.create({:title => 'Example Course 2'})

# User seeds
User.create({:email => 'bingopoop'})
User.create({:email => 'bingopooper'})
