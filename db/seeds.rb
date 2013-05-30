# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
course = Course.create({:title => 'Introduction to Competitive Security Competitions'})
course_two = Course.create({:title => 'Example Course 2'})

lesson_one = Lesson.create({:title => 'PoliCTF Bin 200 - An Example of an Exploitation Problem',
                            :course => course,
                            :body => File.read("db/seed_data/polictf_bin200.md")})

lesson_two = Lesson.create({:title => 'PHDays Quals Pwn 400 - An Example of a High Level Language Exploitation Problem',
                            :course => course,
                            :body => File.read("db/seed_data/phdays_pwn400.md")})

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
