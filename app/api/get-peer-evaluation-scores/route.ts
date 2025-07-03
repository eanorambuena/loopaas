import { getCourseById } from '@/utils/queries'
import { NextResponse } from 'next/server'
import { calculatePeerEvaluationScore } from '@/utils/calculatePeerEvaluationScore'

export async function POST(req: Request) {
  try {
    const { evaluation, students } = await req.json()

    if (!evaluation || !students) {
      return NextResponse.json({ error: 'Missing evaluation or students data' }, { status: 400 })
    }

    console.log('Processing peer evaluation scores for evaluation:', evaluation.id)
    console.log('Number of students in request:', students.length)

    const course = await getCourseById(evaluation.courseId)
    if (!course) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 })
    }

    const peerEvaluationResults = await calculatePeerEvaluationScore(
      evaluation, 
      students, 
      course.abbreviature, 
      course.semester
    )

    // Combine student info with peer evaluation scores
    const studentsWithPeerScores = students.map((student: any) => {
      const peerResult = peerEvaluationResults.find(result => result.userInfoId === student.userInfoId)
      return {
        ...student,
        peerEvaluationScore: peerResult ? peerResult.peerEvaluationScore.toFixed(2) : 'N/A'
      }
    })

    console.log('Final result count:', studentsWithPeerScores.length)
    console.log('Sample final result:', studentsWithPeerScores[0])
    
    return NextResponse.json(studentsWithPeerScores)
  } catch (error) {
    console.error('Error in get-peer-evaluation-scores:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 