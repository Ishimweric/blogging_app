from crewai import Agent, Crew, Process, Task
from crewai.project import CrewBase, agent, crew, task
from crewai.agents.agent_builder.base_agent import BaseAgent
from typing import List

@CrewBase
class BlogWriterCrewai():
    """BlogWriterCrewai crew"""

    agents: List[BaseAgent]
    tasks: List[Task]

    @agent
    def trend_hunter(self) -> Agent:
        return Agent(
            config=self.agents_config['trend_hunter'],  # corresponds to agents.yaml key
            verbose=True
        )

    @agent
    def writer(self) -> Agent:
        return Agent(
            config=self.agents_config['writer'],
            verbose=True
        )

    @agent
    def editor(self) -> Agent:
        return Agent(
            config=self.agents_config['editor'],
            verbose=True
        )

    @agent
    def summarizer(self) -> Agent:
        return Agent(
            config=self.agents_config['summarizer'],
            verbose=True
        )

    @task
    def discover_trend(self) -> Task:
        return Task(
            config=self.tasks_config['discover_trend'],
        )

    @task
    def write_blog(self) -> Task:
        return Task(
            config=self.tasks_config['write_blog'],
        )

    @task
    def edit_blog(self) -> Task:
        return Task(
            config=self.tasks_config['edit_blog'],
        )

    @task
    def summarize_blog(self) -> Task:
        return Task(
            config=self.tasks_config['summarize_blog'],
        )

    @crew
    def crew(self) -> Crew:
        """Creates the BlogWriterCrewai crew"""
        return Crew(
            agents=self.agents,   # All 4 agents automatically picked up
            tasks=self.tasks,     # All 4 tasks automatically picked up
            process=Process.sequential,
            verbose=True
        )
