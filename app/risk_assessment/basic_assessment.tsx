'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Server, Users, Shield, Cloud, Code, Key, FileText } from 'lucide-react'

interface SecurityAspect {
  id: string
  title: string
  description: string
}

interface Category {
  id: string
  title: string
  icon: React.ReactNode
  aspects: SecurityAspect[]
}

const categories: Category[] = [
  {
    id: 'network',
    title: 'Network Security',
    icon: <Server className="w-6 h-6" />,
    aspects: [
      {
        id: 'net-1',
        title: 'IDS/IPS Implementation',
        description: 'Intrusion Detection and Prevention Systems deployment and monitoring'
      },
      {
        id: 'net-2',
        title: 'Network Segmentation',
        description: 'VLAN implementation and network isolation strategies'
      },
      {
        id: 'net-3',
        title: 'VPN Infrastructure',
        description: 'Secure remote access and site-to-site VPN configurations'
      }
    ]
  },
  {
    id: 'cloud',
    title: 'Cloud Security',
    icon: <Cloud className="w-6 h-6" />,
    aspects: [
      {
        id: 'cloud-1',
        title: 'Cloud Configuration Security',
        description: 'Security groups, IAM policies, and resource access controls'
      },
      {
        id: 'cloud-2',
        title: 'Cloud Monitoring & Logging',
        description: 'CloudTrail, CloudWatch, and security event monitoring'
      },
      {
        id: 'cloud-3',
        title: 'Container Security',
        description: 'Docker/Kubernetes security configurations and image scanning'
      }
    ]
  },
  {
    id: 'application',
    title: 'Application Security',
    icon: <Code className="w-6 h-6" />,
    aspects: [
      {
        id: 'app-1',
        title: 'SAST Implementation',
        description: 'Static Application Security Testing in CI/CD pipeline'
      },
      {
        id: 'app-2',
        title: 'DAST Integration',
        description: 'Dynamic Application Security Testing for production systems'
      },
      {
        id: 'app-3',
        title: 'API Security',
        description: 'API authentication, rate limiting, and input validation'
      }
    ]
  },
  {
    id: 'identity',
    title: 'Identity & Access Management',
    icon: <Users className="w-6 h-6" />,
    aspects: [
      {
        id: 'iam-1',
        title: 'Privileged Access Management',
        description: 'PAM solution implementation and monitoring'
      },
      {
        id: 'iam-2',
        title: 'MFA Implementation',
        description: 'Multi-factor authentication coverage and methods'
      },
      {
        id: 'iam-3',
        title: 'Directory Services',
        description: 'Active Directory/LDAP security configurations'
      }
    ]
  },
  {
    id: 'endpoint',
    title: 'Endpoint Security',
    icon: <Shield className="w-6 h-6" />,
    aspects: [
      {
        id: 'end-1',
        title: 'EDR Deployment',
        description: 'Endpoint Detection and Response coverage'
      },
      {
        id: 'end-2',
        title: 'Device Encryption',
        description: 'Full-disk encryption and removable media controls'
      },
      {
        id: 'end-3',
        title: 'Patch Management',
        description: 'Automated patch deployment and compliance monitoring'
      }
    ]
  },
  {
    id: 'crypto',
    title: 'Cryptography & Data Protection',
    icon: <Key className="w-6 h-6" />,
    aspects: [
      {
        id: 'crypto-1',
        title: 'Key Management',
        description: 'HSM usage and key lifecycle management'
      },
      {
        id: 'crypto-2',
        title: 'Data Classification',
        description: 'DLP implementation and data discovery tools'
      },
      {
        id: 'crypto-3',
        title: 'TLS Configuration',
        description: 'Certificate management and cipher suite configurations'
      }
    ]
  },
  {
    id: 'incident',
    title: 'Incident Response',
    icon: <Shield className="w-6 h-6" />,
    aspects: [
      {
        id: 'ir-1',
        title: 'SIEM Implementation',
        description: 'Security Information and Event Management coverage'
      },
      {
        id: 'ir-2',
        title: 'Incident Playbooks',
        description: 'Documented response procedures and automation'
      },
      {
        id: 'ir-3',
        title: 'Forensics Capability',
        description: 'Digital forensics tools and procedures'
      }
    ]
  },
  {
    id: 'compliance',
    title: 'Compliance & Governance',
    icon: <FileText className="w-6 h-6" />,
    aspects: [
      {
        id: 'comp-1',
        title: 'Regulatory Compliance',
        description: 'Compliance monitoring and reporting capabilities'
      },
      {
        id: 'comp-2',
        title: 'Security Frameworks',
        description: 'Implementation of frameworks (NIST, ISO, etc.)'
      },
      {
        id: 'comp-3',
        title: 'Audit Management',
        description: 'Internal/external audit processes and tools'
      }
    ]
  }
]

export default function BasicAssessment() {
  const [currentCategory, setCurrentCategory] = React.useState(0)
  const [scores, setScores] = React.useState<{[key: string]: number}>({})
  const [showResults, setShowResults] = React.useState(false)

  const handleScoreChange = (aspectId: string, value: number) => {
    setScores(prev => ({
      ...prev,
      [aspectId]: value
    }))
  }

  const calculateCategoryScore = (categoryId: string): number => {
    const category = categories.find(c => c.id === categoryId)
    if (!category) return 0

    const aspectScores = category.aspects.map(aspect => scores[aspect.id] || 0)
    const total = aspectScores.reduce((sum, score) => sum + score, 0)
    return Math.round((total / (category.aspects.length * 10)) * 100)
  }

  const calculateOverallScore = (): number => {
    const categoryScores = categories.map(category => calculateCategoryScore(category.id))
    return Math.round(categoryScores.reduce((sum, score) => sum + score, 0) / categories.length)
  }

  const handleNext = () => {
    if (currentCategory < categories.length - 1) {
      setCurrentCategory(prev => prev + 1)
    } else {
      setShowResults(true)
    }
  }

  const handleBack = () => {
    setCurrentCategory(prev => Math.max(0, prev - 1))
  }

  const handleReset = () => {
    setScores({})
    setShowResults(false)
    setCurrentCategory(0)
  }

  //const handlePrint = () => {
    //window.print()
  //}

  const isCategoryComplete = (categoryId: string): boolean => {
    const category = categories.find(c => c.id === categoryId)
    return category?.aspects.every(aspect => typeof scores[aspect.id] === 'number') ?? false
  }

  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <Card className="w-full max-w-4xl mx-auto bg-white/50 dark:bg-slate-800/50 backdrop-blur">
      <CardHeader className="card-header">
        <CardTitle className="text-2xl font-bold text-center">
          Advanced Security Assessment
        </CardTitle>
        <p className="text-center text-gray-600 dark:text-gray-300">
          Rate your security measures in each area from 0 (non-existent) to 10 (excellent)
        </p>
      </CardHeader>
      <CardContent className="card-content" data-date={currentDate}>
        {!showResults ? (
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-6">
              {categories.map((cat, index) => (
                <div
                  key={cat.id}
                  className={`flex-1 h-2 rounded ${
                    index < currentCategory
                      ? 'bg-green-500'
                      : index === currentCategory
                      ? 'bg-blue-500'
                      : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center gap-4 mb-6">
              {categories[currentCategory].icon}
              <h3 className="text-xl font-semibold">{categories[currentCategory].title}</h3>
            </div>

            <div className="space-y-8">
              {categories[currentCategory].aspects.map(aspect => (
                <div key={aspect.id} className="space-y-2">
                  <div className="flex justify-between">
                    <div>
                      <h4 className="font-medium">{aspect.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {aspect.description}
                      </p>
                    </div>
                    <span className="font-bold">{scores[aspect.id] || 0}/10</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={scores[aspect.id] || 0}
                    onChange={(e) => handleScoreChange(aspect.id, parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentCategory === 0}
                className="no-print"
              >
                Back
              </Button>
              <Button
                onClick={handleNext}
                disabled={!isCategoryComplete(categories[currentCategory].id)}
                className="no-print"
              >
                {currentCategory === categories.length - 1 ? 'View Results' : 'Next'}
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-2">Overall Security Score</h3>
              <div className="text-4xl font-bold text-primary mb-4">
                {calculateOverallScore()}%
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {categories.map(category => (
                <Card key={category.id} className="bg-white/50 dark:bg-slate-900/50">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      {category.icon}
                      <h4 className="font-semibold">{category.title}</h4>
                    </div>
                    <p className="text-2xl font-bold text-primary">
                      {calculateCategoryScore(category.id)}%
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 justify-center mt-6 no-print">

              <Button onClick={handleReset} variant="outline">
                Start Over
              </Button>
            </div>

            <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg no-print">
              <h3 className="font-semibold mb-2">Next Steps</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Based on your assessment results, we recommend scheduling a consultation 
                with our security experts to develop a tailored security improvement plan. 
                Our team can help you address the identified gaps and strengthen your 
                overall security posture.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}