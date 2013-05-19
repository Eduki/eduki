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
                                      :answer   => "A"}),
                          Problem.new({:question => "Example Question 2",
                                      :answer   => "D"})]})
quiz_two = Quiz.create({:title => 'Example Quiz 2', :course => course_two,
                        :problems => []})
# User seeds
user_one = User.create({:email => "bingopoop #{rand}"})
user_two = User.create({:email => "bingopooper #{rand}"})

enrollment_one = Enrollment.create({:user => user_one, :course => course})
enrollment_two = Enrollment.create({:user => user_two, :course => course})

quiz_attempt_one = QuizAttempt.construct(enrollment_one, quiz_one,
                                         [{:answer => "A"},
                                          {:answer => "B"}])
quiz_attempt_one.save
