# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
course = Course.create({:title => 'Example Course 1'})
course_two = Course.create({:title => 'Example Course 2'})

lesson_one = Lesson.create({:title => 'Example Lesson 1',
                            :course => course,
                            :body => "Example Body 1"})
lesson_two = Lesson.create({:title => 'Example Lesson 2',
                            :course => course,
                            :body => "Example Body 2"})

quiz_one = Quiz.create({:title => 'Example Quiz 1', :course => course,
                        :problems => [Problem.new({:question => "Example Question 1",
                                      :answer   => "Example Answer 1"}),
                          Problem.new({:question => "Example Question 2",
                                      :answer   => "Example Answer 2"})]})
quiz_two = Quiz.create({:title => 'Example Quiz 2', :course => course_two,
                        :problems => []})
